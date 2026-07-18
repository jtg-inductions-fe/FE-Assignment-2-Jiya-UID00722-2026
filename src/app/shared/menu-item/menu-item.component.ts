import { Component, Input } from '@angular/core';
import { MenuItem } from '@core/models/menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
}
