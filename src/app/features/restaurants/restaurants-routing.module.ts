import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './pages/edit-restaurant/edit-restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantComponent,
  },
  {
    path: 'add',
    component: AddRestaurantComponent,
  },
  {
    path: 'edit/:id',
    component: EditRestaurantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantsRoutingModule {}
