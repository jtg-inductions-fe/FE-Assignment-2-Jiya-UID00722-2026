import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from '@core/models/dashboard.model';
import { RestaurantsService } from '@core/services/restaurants.service';
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

  mode!: 'add' | 'edit';
  restaurantId = '';

  requiredArray(control: AbstractControl): ValidationErrors | null {
    return Array.isArray(control.value) && control.value.length > 0
      ? null
      : { required: true };
  }

  form = this.fb.group({
    restaurantName: ['', Validators.required],
    address: ['', Validators.required],
    owners: this.fb.nonNullable.control<string[]>([], {
      validators: [this.requiredArray],
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
        this.mode === 'add' ? crypto.randomUUID() : this.restaurantId,

      ...this.form.getRawValue(),
    } as Restaurant;

    if (this.mode === 'add') {
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
