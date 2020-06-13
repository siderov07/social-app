import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/core/config/theme/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/ui-elements/create-post/create-post.component';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { take } from 'rxjs/operators';
import { postModalConfig } from 'src/app/core/config/constants/modals-config';
import { ChangeAvatarComponent } from 'src/app/ui-elements/change-avatar/change-avatar.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  isFollowed: boolean;
  loggedUser: IJwtToken;
  @Input() currentUser: IUser;
  @Output() followUserEvent: BehaviorSubject<boolean> = new BehaviorSubject(this.isFollowed);
  @Output() createPostEvent: EventEmitter<IPost> = new EventEmitter();

  constructor(
    private userService: UserService,
    private auth: AuthenticationService,
    private themeService: ThemeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.auth.getToken(true) as IJwtToken;
    this.isFollowed = !!this.currentUser.followers.find(x => x.username === this.loggedUser.username);
    this.followUserEvent.next(this.isFollowed);
  }

  followUser() {
    this.userService.followUser(this.currentUser.id).subscribe(() => {
      this.currentUser.followersCount++;
      this.isFollowed = true;
      this.followUserEvent.next(this.isFollowed);
    });
  }

  unfollowUser() {
    this.userService.unfollowUser(this.currentUser.id).subscribe(() => {
      this.currentUser.followersCount--;
      this.isFollowed = false;
      this.followUserEvent.next(this.isFollowed);
    });
  }

  createPost(): void {
    this.dialog.open(CreatePostComponent, {...postModalConfig})
      .afterClosed()
      .pipe(take(1))
      .subscribe((post: IPost) => {
        if (post) {
          this.createPostEvent.emit(post);
        }
      });
  }

  isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

  changeAvatar(): void {
    this.dialog.open(ChangeAvatarComponent).afterClosed().subscribe((data: IUser) => {
      this.currentUser = data ? data : this.currentUser;
    });
  }

  isMyProfile(): boolean {
    return this.loggedUser.username === this.currentUser.username;
  }
}
