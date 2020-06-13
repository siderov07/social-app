import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { LogedUserGuard } from 'src/app/core/guards/loged-user.guard';

const registerRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [LogedUserGuard],
    component: RegisterPageComponent
  }
];

export const RegisterRoutingModule = RouterModule.forChild(registerRoutes);
