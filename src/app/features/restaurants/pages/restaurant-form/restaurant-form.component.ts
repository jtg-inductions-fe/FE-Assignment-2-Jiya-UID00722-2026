import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant, RestaurantFormMode } from '@core/models/dashboard.model';
import { RestaurantsService } from '@core/services/restaurants.service';
import { requiredArray } from '@core/validators/validators';
import * as ButtonTypes from '@shared/components/button/button.types';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss'],
})
export class RestaurantFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantsService);

  readonly ButtonTypes = ButtonTypes;

  mode!: RestaurantFormMode;
  restaurantId = '';

  form = this.fb.group({
    restaurantName: ['', Validators.required],
    address: ['', Validators.required],
    owners: this.fb.nonNullable.control<string[]>([], {
      validators: [requiredArray],
    }),
  });

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'];

    if (this.mode === 'edit') {
      const id = this.route.snapshot.paramMap.get('id');

      if (!id || !this.restaurantService.restaurantExists(id)) {
        this.goBack();
        return;
      }

      this.restaurantId = id;

      this.restaurantService
        .getRestaurantDetailById(this.restaurantId)
        .subscribe(restaurant => {
          if (!restaurant) {
            this.goBack();
            return;
          }

          this.form.patchValue({
            restaurantName: restaurant.restaurantName,
            address: restaurant.address,
            owners: restaurant.owners ?? [],
          });
        });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const restaurant: Restaurant = {
      restaurantId:
        this.mode === RestaurantFormMode.ADD
          ? crypto.randomUUID()
          : this.restaurantId,

      ...this.form.getRawValue(),
    } as Restaurant;

    if (this.mode === RestaurantFormMode.ADD) {
      this.restaurantService.addRestaurant(restaurant);
    } else {
      this.restaurantService.updateRestaurant(restaurant);
    }

    this.goBack();
  }

  goBack() {
    this.router.navigate(['/restaurants']);
  }
}
