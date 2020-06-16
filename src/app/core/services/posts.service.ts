import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../config/api/api-routes';
import { IPost } from '../entities/posts/post.interface';
import { take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorMessages } from '../config/constants/error-messages';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient, private router: Router) { }

  // Gets only public posts
  getPublicPosts(takeFrom: number, skip: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${ApiRoutes.Posts}?take=${takeFrom}&skip=${skip}`).pipe(take(1));
  }

  // Gets followers public & private posts and the logged user posts
  getPrivatePosts(takeFrom: number, skip: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${ApiRoutes.Posts}/${ApiRoutes.Dashboard}?take=${takeFrom}&skip=${skip}`).pipe(take(1));
  }

  addComment(postId: number, content: string): Observable<IPost> {
    return this.http.post<IPost>(`${ApiRoutes.Comments}/${postId}`, { content }).pipe(take(1));
  }

  likePost(postId: number): Observable<IPost> {
    return this.http.post<IPost>(`${ApiRoutes.Posts}/${postId}/${ApiRoutes.Votes}`, {}).pipe(take(1));
  }

  dislikePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ApiRoutes.Posts}/${postId}/${ApiRoutes.Votes}`, {}).pipe(take(1));
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${ApiRoutes.Comments}/${commentId}`).pipe(take(1));
  }

  editComment(comment: {content: string, id: number}): Observable<any> {
    return this.http.patch(`${ApiRoutes.Comments}/${comment.id}`, comment).pipe(take(1));
  }

  createPost(postData: FormData): Observable<IPost> {
    return this.http.post<IPost>(`${ApiRoutes.Posts}`, postData).pipe(take(1));
  }

  deletePost(postId: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ApiRoutes.Posts}/${postId}`).pipe(take(1));
  }

  getPostById(postId: number): Observable<IPost> {
    return this.http.get<IPost>(`${ApiRoutes.Posts}/${postId}`).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/');
          throw new Error ('Post not found. Error: 404');
        } else {
          throw new Error(ErrorMessages.UnknownError);
        }
      })
    );
  }
}
