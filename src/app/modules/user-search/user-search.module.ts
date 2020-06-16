import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './containers/user-search/user-search.component';
import { UserSearchRoutingModule } from './user-search.module.routing';
import { SocialAppModule } from 'src/app/social-app/social-app.module';



@NgModule({
  declarations: [UserSearchComponent],
  imports: [
    CommonModule,
    UserSearchRoutingModule,
    SocialAppModule
  ]
})
export class UserSearchModule { }
