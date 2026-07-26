export interface DashboardStats {
  revenue: string;
  totalOrders: number;
  completedOrders: number;
  activeRestaurants: number;
}

export interface TopCustomer {
  name: string;
  email: string;
  orderAmount: string;
  avatar: string;
}

export interface TopSellingDish {
  dishName: string;
  restaurantName?: string;
  numberOfOrders: number;
}

export enum Status {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Completed = 'Completed',
  Rejected = 'Rejected',
}

export interface Order {
  orderId: string;
  restaurantName: string;
  customerName: string;
  items: string;
  amount: string;
  status: Status;
}

export interface RestaurantDashboard {
  stats: DashboardStats;
  topCustomers: TopCustomer[];
  topSellingDishes: TopSellingDish[];
  orders?: Order[];
}

export interface Restaurant {
  restaurantId: string;
  restaurantName: string;
}

export interface DetailsCardItem {
  title: string;
  subtitle?: string;
  value: string | number;
  image?: string;
}

export type StatsKey = keyof DashboardStats;

export interface StatsCard {
  title: string;
  key: StatsKey;
  icon: string;
  variant: StatsCardVariant;
}

export enum StatsCardVariant {
  success = 'success',
  info = 'info',
  warning = 'warning',
  primary = 'primary',
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
}

export interface FooterLink {
  href: string;
  icon: string;
}
