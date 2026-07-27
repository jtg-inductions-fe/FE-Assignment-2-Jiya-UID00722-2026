import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { roleGuard } from '@core/guards/role.guard';
import { HttpErrorCode } from '@core/models/errors.model';
import { UserRole } from '@core/models/user.model';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canMatch: [guestGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canMatch: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule,
      ),
  },
  {
    path: 'restaurants',
    canMatch: [roleGuard],
    loadChildren: () =>
      import('./features/restaurants/restaurants.module').then(
        m => m.RestaurantsModule,
      ),
    data: {
      roles: [UserRole.ADMIN],
    },
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {
      variant: HttpErrorCode.NotFound,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
