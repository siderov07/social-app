import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.module.routing';
import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserPostsComponent } from './containers/user-posts/user-posts.component';
import { UserFollowersComponent } from './containers/user-followers/user-followers.component';
import { UserFollowingComponent } from './containers/user-following/user-following.component';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';



@NgModule({
  declarations: [UserHeaderComponent, UserPostsComponent, UserFollowersComponent, UserFollowingComponent, UserSettingsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiElementsModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
