import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetPaths } from '@core/constants/assets';
import { authGuard } from '@core/guards/auth.guard';
import { loggedInGuard } from '@core/guards/logged-in.guard';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canMatch: [loggedInGuard],
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
    path: '**',
    component: ErrorPageComponent,
    data: {
      title: 'Page not found',
      subtitle:
        'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
      imgUrl: AssetPaths.images.NOT_FOUND,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
