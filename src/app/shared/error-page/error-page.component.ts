import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMap } from '@core/constants/errors';
import { ErrorContent, HttpErrorCode } from '@core/models/errors.model';
import * as Button from '@shared/button/button.types';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  private router = inject(Router);
  readonly Button = Button;
  private route = inject(ActivatedRoute);

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imgUrl?: string;

  error: HttpErrorCode = 400;
  errorContent: ErrorContent = {};

  goBack(): void {
    this.router.navigateByUrl('');
  }
  ngOnInit() {
    this.error = this.route.snapshot.data['error'];

    this.errorContent = ErrorMap[HttpErrorCode.NotFound] ?? {
      title: 'Something went wrong',
      subtitle: 'Please try again later',
    };
  }
}
