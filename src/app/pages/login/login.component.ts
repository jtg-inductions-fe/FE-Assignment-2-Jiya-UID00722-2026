import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private snackBar: MatSnackBar) {}

    loading = false;

    hidePassword = true;

    authService = inject(AuthService);
    private router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
        ]),
    });

    login(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.loading = true;

        const email = this.loginForm.value.email!;
        const password = this.loginForm.value.password!;

        const isLoggedIn = this.authService.login(email, password);

        this.loading = false;

        if (!isLoggedIn) {
            this.showNotification(
                'Invalid username or password',
                'Retry',
                'error-snackbar',
            );
            return;
        }
        this.router.navigate(['/dashboard']);
    }

    showNotification(message: string, action: string, panelClass: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: [panelClass],
        });
    }
}
