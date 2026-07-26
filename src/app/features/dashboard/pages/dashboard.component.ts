import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, EMPTY, map, Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DashboardStats,
  DetailsCardItem,
  Order,
  Restaurant,
  RestaurantDashboard,
  Status,
  StatsCard,
  TopCustomer,
  TopSellingDish,
} from '@core/models/dashboard.model';
import { User, UserRole } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { DashboardService } from '@core/services/dashboard.service';
import { STATS_CARDS } from '@core/constants/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  restaurantControl = new FormControl<Restaurant | string>('');

  restaurants: Restaurant[] = [];

  filteredRestaurants!: Observable<Restaurant[]>;

  dashboardData!: RestaurantDashboard;

  stats: DashboardStats = {
    revenue: '',
    totalOrders: 0,
    completedOrders: 0,
    activeRestaurants: 0,
  };

  statsCards: StatsCard[] = STATS_CARDS;

  topCustomers: TopCustomer[] = [];
  topSellingDishes: TopSellingDish[] = [];

  orders: Order[] = [];

  topCustomerItems: DetailsCardItem[] = [];
  topSellingDishItems: DetailsCardItem[] = [];

  currentUser!: User | null;

  isRestaurantOwner = false;

  isLoading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.isRestaurantOwner =
      this.currentUser?.role === UserRole.RESTAURANT_OWNER;

    if (this.isRestaurantOwner) {
      this.loadDashboardForOwner();
    } else {
      this.loadRestaurants();
    }
  }

  private loadRestaurants(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService
      .getRestaurants()
      .pipe(
        takeUntilDestroyed(this.destroyRef),

        catchError(() => {
          this.errorMessage = 'Unable to load restaurants.';

          this.isLoading = false;

          return EMPTY;
        }),
      )
      .subscribe(res => {
        this.isLoading = false;

        this.restaurants = res.restaurants;

        this.filteredRestaurants = this.restaurantControl.valueChanges.pipe(
          startWith(''),

          map(value => {
            const name =
              typeof value === 'string' ? value : (value?.restaurantName ?? '');

            return this.filterRestaurants(name);
          }),

          takeUntilDestroyed(this.destroyRef),
        );

        if (this.restaurants.length) {
          this.restaurantControl.setValue(this.restaurants[0]);

          this.loadDashboard(this.restaurants[0]);
        }
      });
  }

  private loadDashboardForOwner(): void {
    const restaurantId = this.currentUser?.restaurantId;

    if (!restaurantId) {
      this.errorMessage = 'Restaurant information is missing.';

      return;
    }

    this.loadDashboardById(restaurantId);
  }

  private loadDashboard(restaurant: Restaurant): void {
    this.loadDashboardById(restaurant.restaurantId);
  }

  private loadDashboardById(restaurantId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService
      .getDashboardData(restaurantId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),

        catchError(() => {
          this.errorMessage = 'Unable to load dashboard data.';

          this.isLoading = false;

          return EMPTY;
        }),
      )
      .subscribe(res => {
        this.isLoading = false;

        this.setDashboardData(res);
      });
  }

  private filterRestaurants(value: string): Restaurant[] {
    const filterValue = value.toLowerCase().trim();

    return this.restaurants.filter(restaurant =>
      restaurant.restaurantName.toLowerCase().includes(filterValue),
    );
  }

  displayFn(restaurant: Restaurant): string {
    return restaurant ? restaurant.restaurantName : '';
  }

  onRestaurantSelected(restaurant: Restaurant): void {
    this.loadDashboard(restaurant);
  }

  private setDashboardData(res: RestaurantDashboard): void {
    this.dashboardData = res;

    this.stats = res.stats;

    this.topCustomers = res.topCustomers;

    this.topSellingDishes = res.topSellingDishes;

    this.orders = res.orders ?? [];

    this.topCustomerItems = this.topCustomers.map(customer => ({
      title: customer.name,
      subtitle: customer.email,
      value: customer.orderAmount,
      image: customer.avatar,
    }));

    this.topSellingDishItems = this.topSellingDishes.map(dish => ({
      title: dish.dishName,
      subtitle: dish.restaurantName,
      value: `${dish.numberOfOrders} ${
        dish.numberOfOrders === 1 ? 'order' : 'orders'
      }`,
    }));
  }

  acceptOrder(order: Order): void {
    this.orders = this.orders.map(item =>
      item.orderId === order.orderId
        ? {
            ...item,
            status: Status.Accepted,
          }
        : item,
    );
  }

  rejectOrder(order: Order): void {
    this.orders = this.orders.filter(item => item.orderId !== order.orderId);
  }

  completeOrder(order: Order): void {
    this.orders = this.orders.filter(item => item.orderId !== order.orderId);
  }
}
