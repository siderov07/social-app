import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { IJwtToken } from '../entities/authentication/jwt-token.interface';
import { AppRoutes } from '../config/constants/routing';

@Injectable()

export class ProfilePermissionGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const profileOwnerId = +route.paramMap.get('userId');
    const loggedUser = this.authService.getToken(true) as IJwtToken;

    if (profileOwnerId === loggedUser.id) {
      return true;
    }

    this.router.navigateByUrl('/');

    return false;
  }
}
