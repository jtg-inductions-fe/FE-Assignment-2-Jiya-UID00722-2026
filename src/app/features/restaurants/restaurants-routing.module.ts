import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { RestaurantFormComponent } from '@features/restaurants/pages/restaurant-form/restaurant-form.component';
import { RestaurantFormMode } from '@core/models/dashboard.model';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { HttpErrorCode } from '@core/models/errors.model';
import { AppLayoutComponent } from '@shared/layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ViewRestaurantComponent,
      },
      {
        path: 'add',
        component: RestaurantFormComponent,
        data: { mode: RestaurantFormMode.ADD },
      },
      {
        path: 'edit/:id',
        component: RestaurantFormComponent,
        data: { mode: RestaurantFormMode.EDIT },
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
export class RestaurantsRoutingModule {}
