import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './containers/post-page/post-page.component';
import { RouterParams } from 'src/app/core/config/constants/routing';

const postRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':' + RouterParams.PostId,
        pathMatch: 'full',
        component: PostPageComponent
      }
    ]
  }
];

export const PostRoutingModule = RouterModule.forChild(postRoutes);
