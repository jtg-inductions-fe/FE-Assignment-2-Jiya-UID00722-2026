import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuConfig } from '@core/models/menu.model';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';

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

  public menuItems$!: Observable<MenuConfig>;

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    const targetUrl = role === 'ADMIN' ? this.adminUrl : this.ownerUrl;

    this.menuItems$ = this.http.get<MenuConfig>(targetUrl);
  }
}
