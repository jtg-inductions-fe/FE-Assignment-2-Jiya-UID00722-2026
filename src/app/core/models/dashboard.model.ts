export interface DashboardStats {
  revenue: string;
  totalOrders: number;
  completedOrders: number;
  activeRestaurants: number;
}

export interface TopCustomer {
  name: string;
  email: string;
  orderAmount: number;
  avatar: string;
}

export interface TopSellingDish {
  dishName: string;
  restaurantName?: string;
  numberOfOrders: number;
}

export interface Order {
  orderId: string;
  restaurantName: string;
  customerName: string;
  items: string;
  amount: number;
  status: string;
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
