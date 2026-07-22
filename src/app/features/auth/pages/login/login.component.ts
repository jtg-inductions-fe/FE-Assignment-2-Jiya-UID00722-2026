import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import * as Input from '@shared/input/input.types';
import * as Button from '@shared/button/button.types';
import { SnackbarService } from '@core/services/snackBar.service';
import { SnackbarType } from '@core/models/snackbar.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly Input = Input;
  readonly Button = Button;

  private returnUrl = '/';

  private snackBar = inject(SnackbarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor(private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
  }

  loading = false;
  hidePassword = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService.login(email, password).subscribe({
      next: (isLoggedIn: boolean) => {
        this.loading = false;

        if (!isLoggedIn) {
          this.snackBar.showNotification(
            'Invalid username or password',
            SnackbarType.Error,
          );
          this.loginForm.reset();
          return;
        }

        this.router.navigateByUrl(this.returnUrl);
      },

      error: () => {
        this.loading = false;

        this.snackBar.showNotification('Please try again', SnackbarType.Error);
      },
    });
  }
}
