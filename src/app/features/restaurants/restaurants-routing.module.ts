import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { RestaurantFormComponent } from '@features/restaurants/components/restaurant-form/restaurant-form.component';
import { RestaurantFormMode } from '@core/models/dashboard.model';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
