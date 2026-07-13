import { Injectable } from '@angular/core';
import users from '@mock/users.json';
import { User } from '@models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    login(email: string, password: string): boolean {
        const user = users.find(
            x => x.email === email && x.password === password,
        );

        if (!user) {
            return false;
        }

        const sessionUser = { ...user };
        delete (sessionUser as User).password;

        localStorage.setItem('currentUser', JSON.stringify(sessionUser));

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

        try {
            const parsed = JSON.parse(user);
            if (
                parsed &&
                typeof parsed.email === 'string' &&
                typeof parsed.role === 'string'
            ) {
                return parsed as User;
            }
            return null;
        } catch {
            return null;
        }
    }

    getUserRole(): string {
        return this.getCurrentUser()?.role || '';
    }
}
