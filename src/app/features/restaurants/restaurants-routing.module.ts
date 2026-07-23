import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { RestaurantFormComponent } from '@features/restaurants/components/restaurant-form/restaurant-form.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantComponent,
  },
  {
    path: 'add',
    component: RestaurantFormComponent,
    data: { mode: 'add' },
  },
  {
    path: 'edit/:id',
    component: RestaurantFormComponent,
    data: { mode: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
