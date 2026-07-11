import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading=false;

hidePassword=true;

  authService = inject(AuthService);
   private router = inject(Router);

    loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
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
        alert('Invalid email or password');
        return;
      }
      this.router.navigate(['/dashboard']);
  }
}
