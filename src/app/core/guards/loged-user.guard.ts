import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { AppRoutes } from '../config/constants/routing';

@Injectable()
export class LogedUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(): boolean {

    if (this.authService.getToken(true)) {
      this.router.navigate([AppRoutes.Home]);
      return false;
    } else {
      return true;
    }
  }
}
