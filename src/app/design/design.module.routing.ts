import { RouterModule, Routes } from '@angular/router';
import { DesignSystemPageComponent } from './containers/design-system-page/design-system-page.component';

const designRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DesignSystemPageComponent
  }
];

export const DesignRouterModule = RouterModule.forChild(designRoutes);
