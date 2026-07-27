import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantsService } from '@core/services/restaurants.service';
import * as Button from '@shared/components/button/button.types';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.scss'],
})
export class ViewRestaurantComponent {
  private restaurantsService = inject(RestaurantsService);
  private router = inject(Router);

  readonly Button = Button;

  restaurants$ = this.restaurantsService.loadRestaurantsDetails();

  addRestaurant(): void {
    this.router.navigate(['/restaurants/add']);
  }
}
