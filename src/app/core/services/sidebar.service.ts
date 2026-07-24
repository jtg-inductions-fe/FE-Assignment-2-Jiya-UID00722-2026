import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private currentSidebarSubject = new BehaviorSubject<true | false>(true);

  currentSidebarState$ = this.currentSidebarSubject.asObservable();

  toggleSidebar(): void {
    this.currentSidebarSubject.next(!this.currentSidebarSubject.value);
  }

  openSidebar(): void {
    this.currentSidebarSubject.next(true);
  }

  closeSidebar(): void {
    this.currentSidebarSubject.next(false);
  }

  getCurrentSidebarState(): true | false {
    return this.currentSidebarSubject.value;
  }
}
