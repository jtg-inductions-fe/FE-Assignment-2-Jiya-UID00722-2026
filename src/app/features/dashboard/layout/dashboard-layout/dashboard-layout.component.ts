import { Component, inject } from '@angular/core';
import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  private responsiveService = inject(ResponsiveService);
  private sidebarService = inject(SidebarService);

  public isMobile$ = this.responsiveService.isMobile$;
  public currentSidebarState$ = this.sidebarService.currentSidebarState$;

  constructor() {
    this.isMobile$
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(isMobile => {
        if (isMobile) {
          this.sidebarService.closeSidebar();
        } else {
          this.sidebarService.openSidebar();
        }
      });
  }
}
