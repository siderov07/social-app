import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { getInfinityScroll } from 'src/app/shared/infinity-scroll';
import { tap, map, concatMap } from 'rxjs/operators';
import { RouterParams } from 'src/app/core/config/constants/routing';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  takeFrom = 0;
  loadMore = true;
  incrementPostsValue = 3;

  currentUser: IUser;
  isFollowed: boolean;
  postsList: Array<IPost>;

  infinityScroll$: Observable<IPost>;

  constructor( private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const userId = +params.get(RouterParams.UserId);

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
        this.loadMore = this.postsList.length >= this.incrementPostsValue ? true : false;
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
      concatMap(() => this.userService.getUserPosts(this.currentUser.id, this.incrementPostsValue, this.takeFrom)),
      tap((data: Array<IPost | null>) => this.loadMore = data.length > 0 ? true : false),
      map((data: Array<IPost | null>) => this.postsList = data ? this.postsList.concat(data) : this.postsList));
  }

  addPost(post: IPost): void {
    this.postsList.unshift(post);
  }
}
