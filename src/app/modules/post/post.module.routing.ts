import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './containers/post-page/post-page.component';

const postRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':postId',
        pathMatch: 'full',
        component: PostPageComponent
      }
    ]
  }
];

export const PostRoutingModule = RouterModule.forChild(postRoutes);
