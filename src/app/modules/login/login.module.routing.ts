import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LogedUserGuard } from 'src/app/core/guards/loged-user.guard';

const loginRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [LogedUserGuard],
    component: LoginPageComponent
  }
];

export const LoginRoutingModule = RouterModule.forChild(loginRoutes);
