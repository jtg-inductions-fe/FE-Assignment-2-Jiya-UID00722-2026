import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@features/dashboard/pages/dashboard.component';
import { AppLayoutComponent } from '@shared/layout/app-layout.component';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { HttpErrorCode } from '@core/models/errors.model';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
        data: {
          variant: HttpErrorCode.NotFound,
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
