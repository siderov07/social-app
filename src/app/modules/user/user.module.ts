import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.module.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserPostsComponent } from './containers/user-posts/user-posts.component';
import { UserFollowersComponent } from './containers/user-followers/user-followers.component';
import { UserFollowingComponent } from './containers/user-following/user-following.component';
import { RouterModule } from '@angular/router';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { ChangeAvatarComponent } from './components/change-avatar/change-avatar.component';
import { DeleteProfileComponent } from './components/delete-profile/delete-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialAppModule } from 'src/app/social-app/social-app.module';



@NgModule({
  declarations: [
    ChangeAvatarComponent,
    DeleteProfileComponent,
    UserHeaderComponent, UserPostsComponent, UserFollowersComponent, UserFollowingComponent, UserSettingsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SocialAppModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
