import { Injectable } from '@angular/core';
import { User } from '@core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = 'assets/mock/users.json';

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getCurrentUser(),
  );

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(
          x => x.email === email && x.password === password,
        );
        if (!user) {
          return false;
        }

        const sessionUser = { ...user };
        delete (sessionUser as User).password;

        localStorage.setItem('currentUser', JSON.stringify(sessionUser));

        this.currentUserSubject.next(user);
        return true;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string {
    return this.currentUserSubject.value?.role || '';
  }
}
