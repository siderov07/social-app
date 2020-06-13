import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../config/api/api-routes';
import { take } from 'rxjs/operators';
import { IPost } from '../entities/posts/post.interface';
import { IUser } from '../entities/user/user.interface';

@Injectable()
export class UserService {

  constructor( private http: HttpClient ) { }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${ApiRoutes.Users}/${userId}`).pipe(take(1));
  }

  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(`${ApiRoutes.Users}`);
  }

  getUserPosts(userId: number, takeFrom: number, skip: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${ApiRoutes.Users}/${userId}/${ApiRoutes.Posts}?take=${takeFrom}&skip=${skip}`).pipe(take(1));
  }

  getUserFollowing(userId: number): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(`${ApiRoutes.Users}/${userId}/${ApiRoutes.Following}`).pipe(take(1));
  }

  followUser(userId: number): Observable<IUser> {
    return this.http.put<IUser>(`${ApiRoutes.Users}/${userId}/${ApiRoutes.Followers}`, {}).pipe(take(1));
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.delete(`${ApiRoutes.Users}/${userId}/${ApiRoutes.Followers}`).pipe(take(1));
  }

  changeAvatar(formData: FormData): Observable<IUser> {
    return this.http.put<IUser>(`${ApiRoutes.Users}/${ApiRoutes.Avatar}`, formData).pipe(take(1));
  }

  deleteUserProfile(username: string): Observable<any> {
    return this.http.delete(`${ApiRoutes.Users}/${username}`);
  }
}
