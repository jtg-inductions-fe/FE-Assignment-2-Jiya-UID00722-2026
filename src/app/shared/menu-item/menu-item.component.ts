import { Component, Input } from '@angular/core';
import { MenuItem } from '@core/models/menu.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item!: MenuItem;

  constructor(private router: Router) {
    console.log(this.router.url);
  }
}
