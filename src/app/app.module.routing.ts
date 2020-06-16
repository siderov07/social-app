import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from './core/config/constants/routing';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.Home
  },
  {
    path: AppRoutes.Login,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: AppRoutes.Register,
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: AppRoutes.Home,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: AppRoutes.Post,
    loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)
  },
  {
    path: AppRoutes.User,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: AppRoutes.UserSearch,
    loadChildren: () => import('./modules/user-search/user-search.module').then(m => m.UserSearchModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: AppRoutes.Home
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'top'
});
