import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';
import { AppRoutes } from 'src/app/core/config/constants/routing';

const landingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent
      },
      {
        path: AppRoutes.Private,
        pathMatch: 'full',
        canActivate: [AuthenticationGuard],
        component: HomePageComponent
      }
    ]
  }
];

export const LandingRouterModule = RouterModule.forChild(landingRoutes);
