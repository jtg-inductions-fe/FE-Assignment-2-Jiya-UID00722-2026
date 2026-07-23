import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Restaurant, RestaurantDashboard } from '../models/dashboard.model';
import { ASSETS } from '@core/constants/assets';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private selectedRestaurantSubject =
    new BehaviorSubject<RestaurantDashboard | null>(null);

  selectedRestaurant$ = this.selectedRestaurantSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(ASSETS.DATA.RESTAURANTS_LIST);
  }

  getDashboardData(restaurantId: string): Observable<RestaurantDashboard> {
    return this.http
      .get<RestaurantDashboard>(
        `${ASSETS.DATA.RESTAURANTS}/${restaurantId}.json`,
      )
      .pipe(tap(data => this.selectedRestaurantSubject.next(data)));
  }

  selectRestaurant(data: RestaurantDashboard): void {
    this.selectedRestaurantSubject.next(data);
  }
}
