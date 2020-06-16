import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageComponent } from './containers/post-page/post-page.component';
import { PostRoutingModule } from './post.module.routing';
import { SocialAppModule } from 'src/app/social-app/social-app.module';


@NgModule({
  declarations: [PostPageComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    SocialAppModule
  ]
})
export class PostModule { }
