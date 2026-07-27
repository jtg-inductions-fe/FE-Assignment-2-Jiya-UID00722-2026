import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconRegistryService } from '@core/services/icon-registry.service';

export function initializeIconsFactory(
  iconRegistryService: IconRegistryService,
) {
  return () => iconRegistryService.registerIcons();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    IconRegistryService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeIconsFactory,
      deps: [IconRegistryService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
