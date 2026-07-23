import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '@core/models/dashboard.model';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
})
export class RestaurantsListComponent {
  readonly Button = Button;
  private router = inject(Router);

  @Input() restaurants: Restaurant[] = [];

  displayedColumns: string[] = [
    'restaurantName',
    'address',
    'owners',
    'actions',
  ];

  editRestaurant(restaurant: Restaurant): void {
    this.router.navigate([
      '/dashboard/restaurants',
      'edit',
      restaurant.restaurantId,
    ]);
  }
}
