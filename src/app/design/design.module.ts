import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemPageComponent } from './containers/design-system-page/design-system-page.component';
import { DesignRouterModule } from './design.module.routing';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [DesignSystemPageComponent],
  imports: [
    CommonModule,
    DesignRouterModule,
    UiElementsModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class DesignModule { }
