import { Input, Component } from '@angular/core';
import { StatsCardVariant } from '@core/models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() variant: StatsCardVariant = StatsCardVariant.primary;
}
