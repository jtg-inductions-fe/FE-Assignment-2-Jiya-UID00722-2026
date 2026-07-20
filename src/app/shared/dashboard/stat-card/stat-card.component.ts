import { Input, Component } from '@angular/core';
import { DashboardStats } from '@core/models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input({ required: true }) card!: DashboardStats;
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() color = 'primary';
  @Input() iconBg = '';
}
