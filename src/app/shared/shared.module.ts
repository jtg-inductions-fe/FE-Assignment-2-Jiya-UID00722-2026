import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';
import { ButtonComponent } from '@shared/button/button.component';
import { InputComponent } from '@shared/input/input.component';
import { HeaderComponent } from '@shared/header/header.component';
import { AvatarComponent } from '@shared/avatar/avatar.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ErrorPageComponent,
    HeaderComponent,
    AvatarComponent,
  ],
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
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    ErrorPageComponent,
    HeaderComponent,
    AvatarComponent,
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
