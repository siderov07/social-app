import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';
import { NavUserProfileComponent } from './nav-user-profile/nav-user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker.component';
import { SharedModule } from '../shared/shared.module';
import { TextAreaComponent } from './text-area/text-area.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { AutosizeModule } from 'ngx-autosize';
import { ClickOutsideModule } from 'ng-click-outside';
import { RouterModule } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NotificationsPopupComponent } from './notifications-popup/notifications-popup.component';

@NgModule({
  declarations: [
    PostCardComponent,
    CreatePostComponent,
    NotificationsComponent,
    NavUserProfileComponent,
    ScrollToTopComponent,
    EmojiPickerComponent,
    TextAreaComponent,
    PostCommentComponent,
    UserListingComponent,
    LoadingSpinnerComponent,
    ChangeAvatarComponent,
    DeleteProfileComponent,
    SearchBarComponent,
    NotificationsPopupComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    PickerModule,
    SharedModule,
    AutosizeModule,
    FormsModule,
    ClickOutsideModule,
    RouterModule
  ],
  exports: [
    PostCardComponent,
    CreatePostComponent,
    NotificationsComponent,
    NavUserProfileComponent,
    ScrollToTopComponent,
    EmojiPickerComponent,
    TextAreaComponent,
    UserListingComponent,
    LoadingSpinnerComponent,
    ChangeAvatarComponent,
    DeleteProfileComponent,
    SearchBarComponent,
    NotificationsPopupComponent
  ],
})
export class UiElementsModule {}
