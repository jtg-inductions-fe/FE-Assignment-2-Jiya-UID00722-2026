import { Component, inject } from '@angular/core';
import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';
import { distinctUntilChanged, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent {
  private responsiveService = inject(ResponsiveService);
  private sidebarService = inject(SidebarService);

  public isMobile$: Observable<boolean> = this.responsiveService.isMobile$;
  public currentSidebarState$: Observable<boolean> =
    this.sidebarService.currentSidebarState$;

  constructor() {
    this.isMobile$.pipe(distinctUntilChanged()).subscribe(isMobile => {
      if (isMobile) {
        this.sidebarService.close();
      } else {
        this.sidebarService.open();
      }
    });
  }
}
