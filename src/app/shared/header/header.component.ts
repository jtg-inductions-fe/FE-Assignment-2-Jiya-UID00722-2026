import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';
import * as ButtonTypes from '@shared/button/button.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  readonly ButtonTypes = ButtonTypes;
  imageUrl = ASSETS.IMAGES.LOGO;

  currentUser$ = this.authService.currentUser$;

  logout(): void {
    this.authService.logout();
  }
}
