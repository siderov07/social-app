import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { UserSearchComponent } from './containers/user-search/user-search.component';

const userSearchRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
    component: UserSearchComponent
  }
];

export const UserSearchRoutingModule = RouterModule.forChild(userSearchRoutes);
