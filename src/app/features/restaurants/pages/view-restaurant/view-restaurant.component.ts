import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '@core/models/dashboard.model';
import { RestaurantsService } from '@core/services/restaurants.service';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.scss'],
})
export class ViewRestaurantComponent implements OnInit {
  private restaurantsService = inject(RestaurantsService);
  private router = inject(Router);

  readonly Button = Button;

  displayedRestaurants: Restaurant[] = [];

  ngOnInit(): void {
    this.restaurantsService.loadRestaurantsDetails().subscribe();

    this.restaurantsService
      .getRestaurantsDetails()
      .subscribe(restaurants => (this.displayedRestaurants = restaurants));
  }

  addRestaurant(): void {
    this.router.navigate(['/dashboard/restaurants/add']);
  }
}
