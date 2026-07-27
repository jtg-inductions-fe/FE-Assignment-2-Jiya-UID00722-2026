import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RestaurantDashboard,
  RestaurantsResponse,
} from '../models/dashboard.model';

import { ASSETS } from '@core/constants/assets';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getRestaurants(): Observable<RestaurantsResponse> {
    return this.http.get<RestaurantsResponse>(ASSETS.DATA.RESTAURANTS_LIST);
  }

  getDashboardData(restaurantId: string): Observable<RestaurantDashboard> {
    return this.http.get<RestaurantDashboard>(
      `${ASSETS.DATA.RESTAURANTS}/${restaurantId}.json`,
    );
  }
}
