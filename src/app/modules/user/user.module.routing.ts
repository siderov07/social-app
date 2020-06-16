import { RouterModule, Routes } from '@angular/router';
import { UserPostsComponent } from './containers/user-posts/user-posts.component';
import { UserFollowersComponent } from './containers/user-followers/user-followers.component';
import { UserFollowingComponent } from './containers/user-following/user-following.component';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { ProfilePermissionGuard } from 'src/app/core/guards/profile-permission.guard';
import { RouterParams, AppRoutes } from 'src/app/core/config/constants/routing';

const userRoutes: Routes = [
  {
    path: ':' + RouterParams.UserId,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.Posts
      },
      {
        path: AppRoutes.Posts,
        pathMatch: 'full',
        component: UserPostsComponent
      },
      {
        path: AppRoutes.Followers,
        pathMatch: 'full',
        component: UserFollowersComponent
      },
      {
        path: AppRoutes.Following,
        pathMatch: 'full',
        component: UserFollowingComponent
      },
      {
        path: AppRoutes.Settings,
        pathMatch: 'full',
        component: UserSettingsComponent,
        canActivate: [ProfilePermissionGuard]
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);
