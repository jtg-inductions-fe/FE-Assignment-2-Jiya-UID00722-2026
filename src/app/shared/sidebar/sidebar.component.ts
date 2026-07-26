import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MenuConfig, MenuItemType } from '@core/models/menu.model';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';
import { UserRole } from '@core/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private adminUrl = ASSETS.DATA.SIDEBAR.ADMIN;
  private ownerUrl = ASSETS.DATA.SIDEBAR.OWNER;

  readonly MenuItemType = MenuItemType;

  public menuItems$!: Observable<MenuConfig>;

  ngOnInit(): void {
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    const targetUrl = this.getMenuUrl();

    if (!targetUrl) {
      this.menuItems$ = this.emptyMenu();
      return;
    }

    this.menuItems$ = this.http
      .get<MenuConfig>(targetUrl)
      .pipe(catchError(() => this.emptyMenu()));
  }

  private getMenuUrl(): string | null {
    const role = this.authService.getUserRole();

    switch (role) {
      case UserRole.ADMIN:
        return this.adminUrl;

      case UserRole.RESTAURANT_OWNER:
        return this.ownerUrl;

      default:
        return null;
    }
  }

  private emptyMenu(): Observable<MenuConfig> {
    return of({
      primary: [],
      footer: [],
    });
  }
}
