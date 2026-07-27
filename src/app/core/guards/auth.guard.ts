import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  const returnUrl = '/' + segments.map(s => s.path).join('/');

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl },
  });
};
