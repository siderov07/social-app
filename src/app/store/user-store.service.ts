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
    const user: IUser | IJwtToken = JSON.parse(sessionStorage.getItem(SStorage.User));

    if (user) {
      this.loggedUser.next(user);
    }
  }

  setUser(user: IUser | IJwtToken): void {
    sessionStorage.setItem(SStorage.User, JSON.stringify(user));
    this.loggedUser.next(user);
  }
}
