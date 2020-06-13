import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRouterModule } from './landing.module.routing';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';



@NgModule({
  declarations: [ HomePageComponent],
  imports: [
    CommonModule,
    LandingRouterModule,
    UiElementsModule
  ]
})
export class LandingModule { }
