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
    const role = this.authService.getUserRole();
    let targetUrl: string;

    switch (role) {
      case UserRole.ADMIN:
        targetUrl = this.adminUrl;
        break;

      case UserRole.RESTAURANT_OWNER:
        targetUrl = this.ownerUrl;
        break;

      default:
        this.menuItems$ = of({
          primary: [],
          footer: [],
        });
        return;
    }

    this.menuItems$ = this.http.get<MenuConfig>(targetUrl).pipe(
      catchError(() =>
        of({
          primary: [],
          footer: [],
        }),
      ),
    );
  }
}
