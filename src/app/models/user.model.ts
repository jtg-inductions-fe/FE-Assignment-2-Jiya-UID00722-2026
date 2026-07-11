export interface User {
  email: string;
  password: string;
  role: 'ADMIN' | 'RESTAURANT_OWNER';
  name: string;
  avatar: string;
}