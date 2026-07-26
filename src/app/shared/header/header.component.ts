import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';
import * as ButtonTypes from '@shared/button/button.types';
import { SidebarService } from '@core/services/sidebar.service';
import { ResponsiveService } from '@core/services/responsive.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private sidebarService = inject(SidebarService);
  private responsiveService = inject(ResponsiveService);
  private router = inject(Router);

  readonly ButtonTypes = ButtonTypes;
  imageUrl = ASSETS.IMAGES.LOGO;

  private showSidebarToggleSubject = new BehaviorSubject<boolean>(
    this.isDashboardRoute(),
  );

  currentUser$ = this.authService.currentUser$;

  public currentSidebarState$ = this.sidebarService.currentSidebarState$;
  public isMobile$ = this.responsiveService.isMobile$;
  showSidebarToggle$ = this.showSidebarToggleSubject.asObservable();

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showSidebarToggleSubject.next(this.isDashboardRoute());
      });
  }

  private isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.authService.logout();
  }
}
