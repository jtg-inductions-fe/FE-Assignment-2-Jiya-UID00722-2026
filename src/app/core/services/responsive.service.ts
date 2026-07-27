import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    this.breakpointObserver.observe('(max-width: 700px)').subscribe(state => {
      this.isMobileSubject.next(state.matches);
    });
  }
}
