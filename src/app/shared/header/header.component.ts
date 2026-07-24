import { Component, inject } from '@angular/core';
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

  readonly ButtonTypes = ButtonTypes;
  imageUrl = ASSETS.IMAGES.LOGO;

  currentUser$ = this.authService.currentUser$;

  public currentSidebarState$ = this.sidebarService.currentSidebarState$;
  public isMobile$ = this.responsiveService.isMobile$;

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.authService.logout();
  }
}
