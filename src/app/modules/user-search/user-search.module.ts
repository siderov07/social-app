import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './containers/user-search/user-search.component';
import { UserSearchRoutingModule } from './user-search.module.routing';
import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';



@NgModule({
  declarations: [UserSearchComponent],
  imports: [
    CommonModule,
    UserSearchRoutingModule,
    UiElementsModule
  ]
})
export class UserSearchModule { }
