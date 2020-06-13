import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { getInfinityScroll } from 'src/app/shared/infinity-scroll';
import { tap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  loadMore = true;
  incrementPostsValue = 2;
  takeFrom = 0;
  isFollowed: boolean;
  currentUser: IUser;
  infinityScroll$: Observable<IPost>;
  postsList: Array<IPost>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const userId = +params.get('userId');

      this.userService.getUserById(userId).subscribe((user: IUser) => {
        this.currentUser = user;
        this.setInitialPosts();
      });

      this.handleInfinityScroll();
    });
  }

  setInitialPosts(): void {
    this.takeFrom = 0;
    this.loadMore = true;

    this.userService.getUserPosts(this.currentUser.id, this.incrementPostsValue, this.takeFrom)
      .subscribe((posts: Array<IPost>) => {
        this.postsList = posts;
        this.handleInfinityScroll();
      });
  }

  handleFollow(isFollowed?: boolean) {
    this.isFollowed = isFollowed;

    if (this.currentUser ) {
      this.setInitialPosts();
    } else {
      this.takeFrom = 0;
      this.postsList = [];
    }
  }

  handleInfinityScroll(): void {
    this.infinityScroll$ = getInfinityScroll.apply(this).pipe(
      tap(() => this.takeFrom += this.incrementPostsValue),
      switchMap(() => this.userService.getUserPosts(this.currentUser.id, this.incrementPostsValue, this.takeFrom)),
      tap((data: Array<IPost | null>) => this.loadMore = data.length > 0 ? true : false),
      map((data: Array<IPost | null>) => this.postsList = data ? this.postsList.concat(data) : this.postsList));
  }

  addPost(post: IPost): void {
    this.postsList.unshift(post);
  }
}
