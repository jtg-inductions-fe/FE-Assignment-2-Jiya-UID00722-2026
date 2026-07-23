import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ASSETS } from '@core/constants/assets';
import { Restaurant, RestaurantsResponse } from '@core/models/dashboard.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http = inject(HttpClient);

  private restaurantsSubject = new BehaviorSubject<Restaurant[]>([]);
  readonly restaurants$ = this.restaurantsSubject.asObservable();

  private loaded = false;

  loadRestaurantsDetails(): Observable<Restaurant[]> {
    if (this.loaded) {
      return this.restaurants$;
    }

    return this.http
      .get<RestaurantsResponse>(ASSETS.DATA.RESTAURANTS_DETAILS)
      .pipe(
        map(response => response.restaurants),
        tap(restaurants => {
          this.loaded = true;
          this.restaurantsSubject.next(restaurants);
        }),
      );
  }

  getRestaurantsDetails(): Observable<Restaurant[]> {
    return this.restaurants$;
  }

  getCurrentRestaurantsDetails(): Restaurant[] {
    return this.restaurantsSubject.value;
  }

  getRestaurantDetailById(
    restaurantId: string,
  ): Observable<Restaurant | undefined> {
    return this.restaurants$.pipe(
      map(restaurants =>
        restaurants.find(r => r.restaurantId === restaurantId),
      ),
    );
  }

  addRestaurant(restaurant: Restaurant): void {
    const restaurants = this.getCurrentRestaurantsDetails();

    this.restaurantsSubject.next([...restaurants, restaurant]);
  }

  updateRestaurant(updatedRestaurant: Restaurant): void {
    const updated = this.getCurrentRestaurantsDetails().map(restaurant =>
      restaurant.restaurantId === updatedRestaurant.restaurantId
        ? updatedRestaurant
        : restaurant,
    );

    this.restaurantsSubject.next(updated);
  }

  setRestaurants(restaurants: Restaurant[]): void {
    this.restaurantsSubject.next(restaurants);
  }

  restaurantExists(restaurantId: string): boolean {
    return this.getCurrentRestaurantsDetails().some(
      restaurant => restaurant.restaurantId === restaurantId,
    );
  }
}
