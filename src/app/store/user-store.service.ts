import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IJwtToken } from '../core/entities/authentication/jwt-token.interface';
import { IUser } from '../core/entities/user/user.interface';
import { SStorage } from '../core/config/constants/storage';

@Injectable()
export class UserStoreService {

  private loggedUser: BehaviorSubject<IJwtToken | IUser> = new BehaviorSubject(null);
  public readonly loggedUser$: Observable<IJwtToken | IUser> = this.loggedUser.asObservable();

  constructor() {
    const currentUser: IUser | IJwtToken | null = JSON.parse(sessionStorage.getItem(SStorage.User));

    if (currentUser) {
      this.loggedUser.next(currentUser);
    }
  }

  setUser(user: IUser | IJwtToken | null): void {
    sessionStorage.setItem(SStorage.User, JSON.stringify(user));
    this.loggedUser.next(user);
  }
}
