import { RouterModule, Routes } from '@angular/router';
import { UserPostsComponent } from './containers/user-posts/user-posts.component';
import { UserFollowersComponent } from './containers/user-followers/user-followers.component';
import { UserFollowingComponent } from './containers/user-following/user-following.component';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { ProfilePermissionGuard } from 'src/app/core/guards/profile-permission.guard';

const userRoutes: Routes = [
  {
    path: ':userId',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
      {
        path: 'posts',
        pathMatch: 'full',
        component: UserPostsComponent
      },
      {
        path: 'followers',
        pathMatch: 'full',
        component: UserFollowersComponent
      },
      {
        path: 'following',
        pathMatch: 'full',
        component: UserFollowingComponent
      },
      {
        path: 'settings',
        pathMatch: 'full',
        component: UserSettingsComponent,
        canActivate: [ProfilePermissionGuard]
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);
