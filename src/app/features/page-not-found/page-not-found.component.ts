import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  private router = inject(Router);
  readonly Button = Button;

  goBack(): void {
    this.router.navigateByUrl('');
  }
}
