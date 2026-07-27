import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';
import * as ButtonTypes from '@shared/components/button/button.types';
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

  currentUser$ = this.authService.currentUser$;

  currentSidebarState$ = this.sidebarService.currentSidebarState$;
  isMobile$ = this.responsiveService.isMobile$;

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.authService.logout();
  }
}
