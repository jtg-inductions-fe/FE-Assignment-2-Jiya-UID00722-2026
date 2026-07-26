import { Component, inject } from '@angular/core';
import { IconRegistryService } from '@core/services/icon-registry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly _ = inject(IconRegistryService);
  title = 'my-app';
}
