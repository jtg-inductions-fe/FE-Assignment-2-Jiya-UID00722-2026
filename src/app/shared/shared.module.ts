import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/button/button.component';
import { InputComponent } from '@shared/input/input.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';

@NgModule({
  declarations: [ButtonComponent, InputComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    NgOptimizedImage,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ErrorPageComponent,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      },
    },
  ],
})
export class SharedModule {}
