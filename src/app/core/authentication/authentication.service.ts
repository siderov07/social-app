import { Injectable, EventEmitter } from '@angular/core';
import { SStorage, LStorage } from '../config/constants/storage';
import { HttpClient } from '@angular/common/http';
import { ILoginForm, ILoginResponse } from '../entities/authentication/login.interface';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { IRegisterForm, IRegisterResponse } from '../entities/authentication/register.interface';
import { take, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IJwtToken } from '../entities/authentication/jwt-token.interface';
import { ThemeService } from '../config/theme/theme.service';
import { ApiRoutes } from '../config/api/api-routes';
import { UserStoreService } from 'src/app/store/user-store.service';

@Injectable()
export class AuthenticationService {

  public loginFail: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router,
    private themeService: ThemeService,
    private userStore: UserStoreService
  ) { }

  login(loginRequest: ILoginForm): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>( ApiRoutes.Login, loginRequest ).pipe(
      take(1),
      tap(success => {
        sessionStorage.setItem(SStorage.Token, success.token);
        this.themeService.initializeTheme(true);
        this.userStore.setUser(this.getToken(true) as IJwtToken);
      }),
    );
  }

  register(newUserData: IRegisterForm): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>( ApiRoutes.Register, newUserData ).pipe(take(1));
  }

  logout(): void {
    const user = (this.getToken(true) as IJwtToken).username;

    localStorage.setItem(LStorage.LastUser, user);
    localStorage.setItem(LStorage.LastUserTheme, this.themeService.getActiveTheme().name);
    sessionStorage.removeItem(SStorage.Token);

    this.themeService.initializeTheme(false);
    this.userStore.setUser(null);
    this.router.navigateByUrl('/');
  }

  getToken(decoded: boolean): IJwtToken | null | string {
    const jwtService = new JwtHelperService();
    let token = null;

    try {
      token = sessionStorage.getItem(SStorage.Token);

      if (jwtService.isTokenExpired(token)) {
        throw new Error('Token is expired. Please log in again');
      }

      const decodedToken = jwtService.decodeToken(token);
      token = decoded ? decodedToken : sessionStorage.getItem(SStorage.Token);

    } catch (error) {
      token = null;
    }

    return token;
  }

  getLastUser(): string {
    return localStorage.getItem(LStorage.LastUser);
  }
}
