import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '@core/models/user.model';
import { AssetPaths } from '@core/constants/assets';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getCurrentUser(),
  );

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private router = inject(Router);

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(AssetPaths.data.USERS).pipe(
      map(users => {
        const user = users.find(
          ({ email: userEmail, password: userPassword }) =>
            userEmail === email && userPassword === password,
        );
        if (!user) {
          return false;
        }

        const sessionUser = { ...user, password: undefined };

        localStorage.setItem('currentUser', JSON.stringify(sessionUser));

        this.currentUserSubject.next(user);
        return true;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');

    if (!user) {
      return null;
    }
    try {
      return JSON.parse(user) as User;
    } catch {
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  getUserRole(): string {
    return this.currentUserSubject.value?.role || '';
  }
}
