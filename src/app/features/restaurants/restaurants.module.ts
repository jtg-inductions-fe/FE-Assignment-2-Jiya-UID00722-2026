import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { EditRestaurantComponent } from './pages/edit-restaurant/edit-restaurant.component';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { AddRestaurantComponent } from './pages/add-restaurant/add-restaurant.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    EditRestaurantComponent,
    ViewRestaurantComponent,
    AddRestaurantComponent,
  ],
  imports: [CommonModule, RestaurantsRoutingModule, SharedModule],
})
export class RestaurantsModule {}
