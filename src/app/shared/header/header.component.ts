import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ASSETS } from '@core/constants/assets';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  readonly Button = Button;
  imageUrl = ASSETS.IMAGES.LOGO;

  logout(): void {
    this.authService.logout();
  }
}
