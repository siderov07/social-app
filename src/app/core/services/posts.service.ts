import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../config/api/api-routes';
import { IPost } from '../entities/posts/post.interface';
import { take } from 'rxjs/operators';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  // Gets only public posts
  // tslint:disable-next-line: no-shadowed-variable
  getPublicPosts(take: number, skip: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${ApiRoutes.Posts}?take=${take}&skip=${skip}`);
  }

  // Gets followers public & private posts and the logged user posts
  // tslint:disable-next-line: no-shadowed-variable
  getPrivatePosts(take: number, skip: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${ApiRoutes.Posts}/${ApiRoutes.Dashboard}?take=${take}&skip=${skip}`);
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
    return this.http.get<IPost>(`${ApiRoutes.Posts}/${postId}`);
  }
}
