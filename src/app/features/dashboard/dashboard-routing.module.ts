import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@features/dashboard/pages/dashboard.component';
import { DashboardLayoutComponent } from '@features/dashboard/layout/dashboard-layout/dashboard-layout.component';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'restaurants',
        loadChildren: () =>
          import('../restaurants/restaurants.module').then(
            m => m.RestaurantsModule,
          ),
      },
      {
        path: '**',
        component: ErrorPageComponent,
        data: {
          error: 404,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
