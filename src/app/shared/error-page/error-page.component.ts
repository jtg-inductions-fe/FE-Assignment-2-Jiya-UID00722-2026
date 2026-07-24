import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMap } from '@core/constants/errors';
import { ErrorContent, HttpErrorCode } from '@core/models/errors.model';
import * as ButtonTypes from '@shared/button/button.types';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imgUrl?: string;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly ButtonTypes = ButtonTypes;

  error: HttpErrorCode = HttpErrorCode.NotFound;
  errorContent: ErrorContent = {};

  goBack(): void {
    this.router.navigateByUrl('');
  }
  ngOnInit() {
    this.error = this.route.snapshot.data['variant'];

    this.errorContent =
      ErrorMap[this.error] ??
      (ErrorMap[HttpErrorCode.BadRequest] as ErrorContent);
  }
}
