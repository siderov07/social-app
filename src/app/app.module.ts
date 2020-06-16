import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SocialAppModule } from './social-app/social-app.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SocialAppModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
