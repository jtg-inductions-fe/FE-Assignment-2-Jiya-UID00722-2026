import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DashboardStats,
  Order,
  Restaurant,
  RestaurantDashboard,
  TopCustomer,
  TopSellingDish,
  DetailsCardItem,
} from '@core/models/dashboard.model';
import { DashboardService } from '@core/services/dashboard.service';
import { map, Observable, startWith } from 'rxjs';

type StatsKey = keyof DashboardStats;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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

  statsCards: {
    title: string;
    key: StatsKey;
    icon: string;
    color: string;
    iconBg: string;
  }[] = [
    {
      title: 'Total Revenue',
      key: 'revenue',
      icon: 'attach_money',
      color: '#2E7D32',
      iconBg: '#4CAF5014',
    },
    {
      title: 'Total Orders',
      key: 'totalOrders',
      icon: 'shopping_cart',
      color: '#0288D1',
      iconBg: '#03A9F414',
    },
    {
      title: 'Completed Orders',
      key: 'completedOrders',
      icon: 'check_circle',
      color: '#ED6C02',
      iconBg: '#FF980014',
    },
    {
      title: 'Active Restaurants',
      key: 'activeRestaurants',
      icon: 'restaurant',
      color: '#0E9F6E',
      iconBg: '#9C27B014',
    },
  ];

  topCustomers: TopCustomer[] = [];
  topSellingDishes: TopSellingDish[] = [];
  orders: Order[] = [];

  topCustomerItems: DetailsCardItem[] = [];
  topSellingDishItems: DetailsCardItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getRestaurants().subscribe((res: any) => {
      this.restaurants = res.restaurants;

      this.filteredRestaurants = this.restaurantControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name =
            typeof value === 'string' ? value : (value?.restaurantName ?? '');

          return this.filter(name);
        }),
      );

      // selecting the first restaurant by default
      if (this.restaurants.length) {
        this.restaurantControl.setValue(this.restaurants[0]);
        this.loadDashboard(this.restaurants[0]);
      }
    });
  }

  private filter(value: string): Restaurant[] {
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

  private loadDashboard(restaurant: Restaurant): void {
    this.dashboardService
      .getDashboardData(restaurant.restaurantId)
      .subscribe((res: RestaurantDashboard) => {
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
          value: `${dish.numberOfOrders} orders`,
        }));
      });
  }
}
