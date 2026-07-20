import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ErrorPageComponent } from '@shared/error-page/error-page.component';
import { ButtonComponent } from '@shared/button/button.component';
import { InputComponent } from '@shared/input/input.component';
import { HeaderComponent } from '@shared/header/header.component';
import { AvatarComponent } from '@shared/avatar/avatar.component';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { MenuItemComponent } from '@shared/menu-item/menu-item.component';
import { DashboardLayoutComponent } from '@features/dashboard/layout/dashboard-layout/dashboard-layout.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { StatCardComponent } from '@shared/dashboard/stat-card/stat-card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ErrorPageComponent,
    HeaderComponent,
    AvatarComponent,
    SidebarComponent,
    MenuItemComponent,
    DashboardLayoutComponent,
    FooterComponent,
    StatCardComponent,
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
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    RouterOutlet,
    MatCardModule,
    MatAutocompleteModule,
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
    SidebarComponent,
    MatBadgeModule,
    FooterComponent,
    MatAutocompleteModule,
    StatCardComponent,
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
