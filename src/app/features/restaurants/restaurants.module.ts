import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ViewRestaurantComponent } from './pages/view-restaurant/view-restaurant.component';
import { SharedModule } from '@shared/shared.module';
import { RestaurantsListComponent } from './components/restaurants-list/restaurants-list.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';

@NgModule({
  declarations: [
    ViewRestaurantComponent,
    RestaurantsListComponent,
    RestaurantFormComponent,
  ],
  imports: [CommonModule, RestaurantsRoutingModule, SharedModule],
})
export class RestaurantsModule {}
