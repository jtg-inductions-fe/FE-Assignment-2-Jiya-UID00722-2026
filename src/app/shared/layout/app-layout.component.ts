import { Component, inject, OnInit } from '@angular/core';
import { ResponsiveService } from '@core/services/responsive.service';
import { SidebarService } from '@core/services/sidebar.service';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  private responsiveService = inject(ResponsiveService);
  private sidebarService = inject(SidebarService);

  isMobile$ = this.responsiveService.isMobile$;
  currentSidebarState$ = this.sidebarService.currentSidebarState$;

  isMobileWindow$ = this.isMobile$.pipe(
    distinctUntilChanged(),
    takeUntilDestroyed(),
  );

  ngOnInit(): void {
    this.isMobileWindow$.subscribe(isMobile => {
      if (isMobile) {
        this.sidebarService.closeSidebar();
      } else {
        this.sidebarService.openSidebar();
      }
    });
  }
}
