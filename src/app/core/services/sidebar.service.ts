import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  currentSidebarState: true | false = true;
  private currentSidebarSubject = new BehaviorSubject<true | false>(
    this.currentSidebarState,
  );

  currentSidebarState$ = this.currentSidebarSubject.asObservable();

  toggle(): void {
    this.currentSidebarSubject.next(!this.currentSidebarSubject.value);
  }

  open(): void {
    this.currentSidebarSubject.next(true);
  }

  close(): void {
    this.currentSidebarSubject.next(false);
  }

  getCurrentSidebarState(): true | false {
    return this.currentSidebarSubject.value;
  }
}
