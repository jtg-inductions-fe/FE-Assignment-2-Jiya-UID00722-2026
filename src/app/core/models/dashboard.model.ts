export interface DashboardStats {
  title: string;
  value: number;
}

export interface TopCustomer {
  name: string;
  email: string;
  orderAmount: number;
}

export interface TopSellingDish {
  dishName: string;
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
  stats: DashboardStats[];
  topCustomers: TopCustomer[];
  topSellingDishes: TopSellingDish[];
  orders?: Order[];
}
