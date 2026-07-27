import { Component } from '@angular/core';
import { FOOTER_LINKS } from '@core/constants/dashboard';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly footerLinks = FOOTER_LINKS;
  readonly today = new Date();
}
