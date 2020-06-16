import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { Observable } from 'rxjs';
import { take, map, tap, concatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { getInfinityScroll } from 'src/app/shared/infinity-scroll';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  postsList: Array<IPost> = null;
  loadMore = true;
  takeFrom = 0;
  incrementPostsValue = 3;
  isPrivate: boolean;
  isUserLogged$: Observable<IJwtToken | IUser>;
  infinityScroll$: Observable<Array<IPost> | null>;

  constructor(
    private userStore: UserStoreService,
    private postService: PostsService,
    private route: ActivatedRoute ) {}

  ngOnInit(): void {
    // Checks if router is on the 'private' section
    this.isPrivate = !!this.route.snapshot.url.find(x => x.parameters.path !== 'private');
    this.isPrivate ? this.handlePrivatePosts() : this.handlePublicPosts();

    this.isUserLogged$ = this.userStore.loggedUser$;

    this.infinityScroll$ = getInfinityScroll.apply(this).pipe(
      tap(() => this.takeFrom += this.incrementPostsValue), // Updates 'skip' value for the http request
      concatMap(() => {
        return this.isPrivate // returns appropriate http call \
        ? this.postService.getPrivatePosts(this.incrementPostsValue, this.takeFrom)
        : this.postService.getPublicPosts(this.incrementPostsValue, this.takeFrom);
      }),
      // Updates 'loadMore' depending of returned data from the server. ('tap' fn doesn't change the value from the stream)
      tap((data: Array<IPost | null>) => this.loadMore = data.length > 0 ? true : false),
      // Adds to the posts list retrieved data from the server or doesn't change it if retrieved data is empty
      map((data: Array<IPost | null>) => this.postsList = data ? this.postsList.concat(data) : this.postsList));
  }

  handlePublicPosts(): void {
    this.postService.getPublicPosts(this.incrementPostsValue, this.takeFrom).pipe(take(1))
      .subscribe(data => this.postsList = data);
  }

  private handlePrivatePosts(): void {
    this.postService.getPrivatePosts(this.incrementPostsValue, this.takeFrom).pipe(take(1))
    .subscribe(data => this.postsList = data);
  }

  onPostDeletion(postId: number): void {
    this.postsList = this.postsList.filter(post => post.id !== postId);
  }
}
