export enum UserRole {
  ADMIN = 'ADMIN',
  RESTAURANT_OWNER = 'RESTAURANT_OWNER',
}
export interface User {
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  password?: string;
  restaurantId?: string;
}
