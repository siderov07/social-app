import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IPostComment } from 'src/app/core/entities/posts/post.interface';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent {

  @Input() comment: IPostComment;
  @Input() canActivateActions: boolean;

  @Output() deleteComment: EventEmitter<number> = new EventEmitter();
  @Output() editComment: EventEmitter<{content: string, id: number}> = new EventEmitter();

  isEditToggled: boolean;

  constructor() { }

  getAvatar(avatar: string): string {
    return avatar === 'default_avatar' ? '../../../assets/icons/default-avatar.png' : avatar;
  }

  onDeleteComment(): void {
    this.deleteComment.emit(this.comment.id);
  }

  hideEdit(): void {
    this.isEditToggled = false;
  }

  toggleEdit(): void {
    this.isEditToggled = !this.isEditToggled;
  }

  submitEditComment(content: string): void {
    this.isEditToggled = false;
    this.editComment.emit({content, id: this.comment.id});
  }
}
