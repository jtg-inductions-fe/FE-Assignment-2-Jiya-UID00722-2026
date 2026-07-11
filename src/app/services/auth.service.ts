import { Injectable } from '@angular/core';
import { USERS } from '../mock/users';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  login(email: string, password: string): boolean {

    const user = USERS.find(x =>
      x.email === email &&
      x.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));

    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {

    const user = localStorage.getItem('currentUser');

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  getUserRole(): string {
    return this.getCurrentUser()?.role || '';
  }

}
