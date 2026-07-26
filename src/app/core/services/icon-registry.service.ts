import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ASSETS } from '@core/constants/assets';

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    ['twitter', 'facebook', 'github', 'website'].forEach(icon => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `${ASSETS.IMAGES.ICONS}/${icon}.svg`,
        ),
      );
    });
  }
}
