import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPageComponent } from './containers/post-page/post-page.component';
import { PostRoutingModule } from './post.module.routing';
import { UiElementsModule } from 'src/app/ui-elements/ui-elements.module';


@NgModule({
  declarations: [PostPageComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    UiElementsModule
  ]
})
export class PostModule { }
