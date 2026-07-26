import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ReportGeneratorComponent } from './components/report-generator/report-generator.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { OrdersCardComponent } from './components/orders-card/orders-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatCardComponent,
    ReportGeneratorComponent,
    DetailsCardComponent,
    OrdersCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
