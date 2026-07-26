import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserRole } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';

export const roleGuard: CanMatchFn = route => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as UserRole[];
  const userRole = authService.getUserRole();

  // missing or invalid roles configuration
  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    return router.createUrlTree(['/dashboard']);
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
