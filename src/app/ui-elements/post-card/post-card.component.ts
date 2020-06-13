import { Component, OnInit, Input, Optional, Output } from '@angular/core';
import { IPost, IPostComment } from 'src/app/core/entities/posts/post.interface';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ImageDialogComponent } from 'src/app/shared/image-dialog/image-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';
import { PostsService } from 'src/app/core/services/posts.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { mergeMap, tap, takeWhile } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { postModalConfig } from 'src/app/core/config/constants/modals-config';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  @Input() @Optional() visibleComments = 3;
  @Input() @Optional() canOpenImage = false;
  @Output() postDeletionEvent: EventEmitter<number> = new EventEmitter();

  currentUser = this.auth.getToken(true) as IJwtToken | null;
  isLiked: boolean;
  isUserLogged: IUser | IJwtToken | null;
  commentForm: FormGroup;
  showPostActions = false;

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private postService: PostsService,
    private userStore: UserStoreService,
    private router: Router ) { }


  ngOnInit(): void {
    this.userStore.loggedUser$.subscribe(user => this.isUserLogged = user);

    this.commentForm = this.fb.group({
      comment: ['']
    });

    this.sortComments();
    this.checkLike();
  }

  handleLike(): void {
    if (this.isLiked) {
      this.postService.dislikePost(this.post.id)
      .subscribe();
      this.post.likes = this.post.likes.filter(x => x.votedBy.username !== this.currentUser.username);
      this.checkLike();

    } else {
      this.postService.likePost(this.post.id)
      .subscribe((response: IPost) => {
        this.post.likes = response.likes;
        this.checkLike();
      });
    }
  }

  openImage(): void {
    if (this.canOpenImage) {
      this.dialog.open(ImageDialogComponent, {
        ...postModalConfig,
        data: this.post.image.directLink
      });
    }

  }

  checkLike(): void {
    if (this.currentUser && this.post?.likes) {
      this.isLiked = !!this.post.likes.find(x => x.votedBy.username === this.currentUser.username);
    }
  }

  inputEvent(event: string): void {
    this.commentForm.controls.comment.patchValue(event);
  }

  sortComments(): void {
    if (this.post?.comments) {
      this.post.comments = this.post.comments.sort((a, b) => b.createdOn - a.createdOn);
    }
  }

  editComment(comment: {content: string, id: number}): void {

    // Checks if the updated comment is empty - shows a confirm dialog for deleting the comment
    if (!!!comment.content.trim()) {
      this.deleteComment(comment.id);
      return;
    }

    comment.content = escape(comment.content);

    this.postService.editComment(comment).subscribe((newComment: IPostComment) => {

      this.post.comments.forEach((item, index) => {
        if (item.id === newComment.id) {
          const { author } = this.post.comments[index];

          this.post.comments[index] = { ...newComment, author };
        }
      });
    });
  }

  onComment(): void {
    const { comment } = this.commentForm.value;
    const escapedComment = escape(comment);

    this.postService.addComment(this.post.id, escapedComment).subscribe((response: IPost) => {
      this.commentForm.reset();
      this.post.comments = response.comments;
      this.sortComments();
    });
  }

  deleteComment(id: number): void {
    this.dialog.open(ConfirmDialogComponent).afterClosed().pipe(
      takeWhile((confirm: boolean) => confirm),
      mergeMap(() => this.postService.deleteComment(id).pipe(
        tap(() => this.post.comments = this.post.comments.filter(x => x.id !== id))
      ))
    ).subscribe();
  }

  togglePostActions(): void {
    this.showPostActions = !this.showPostActions;
  }

  deletePost(): void {
    this.dialog.open(ConfirmDialogComponent).afterClosed().pipe(
      takeWhile((confirm: boolean) => confirm),
      mergeMap(() => this.postService.deletePost(this.post.id).pipe(
        tap(() => {
          if (this.router.url.includes('post/')) {
            this.router.navigateByUrl('home/private');
          } else {
            this.postDeletionEvent.emit(this.post.id);
            this.post = null;
          }
        })
      ))
    ).subscribe();
  }

  editPost(): void {
    this.dialog.open(CreatePostComponent, {
      ...postModalConfig,
      data: this.post,
    }).afterClosed().subscribe((data: IPost) => {
      this.post = data ? data : this.post;
    });
  }
}
