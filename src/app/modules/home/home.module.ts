import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRouterModule } from './home.module.routing';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SocialAppModule } from 'src/app/social-app/social-app.module';



@NgModule({
  declarations: [ HomePageComponent],
  imports: [
    CommonModule,
    LandingRouterModule,
    SocialAppModule
  ]
})
export class HomeModule { }
