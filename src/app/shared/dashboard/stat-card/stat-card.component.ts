import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() color = 'primary';
  @Input() iconBg = '';
}
