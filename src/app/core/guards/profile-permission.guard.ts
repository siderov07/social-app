import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { IUser } from '../entities/user/user.interface';
import { IJwtToken } from '../entities/authentication/jwt-token.interface';
import { AppRoutes } from '../config/constants/routing';

@Injectable()

export class ProfilePermissionGuard implements CanActivate {
  profileOwner: IUser;
  currentUser: IJwtToken;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const profileOwnerId = +route.paramMap.get('userId');
    const loggedUser: IJwtToken = this.authService.getToken(true) as IJwtToken;

    if (profileOwnerId === loggedUser.id) {
      return true;
    }

    this.router.navigateByUrl(`${AppRoutes.User}/${profileOwnerId}/posts`);

    return false;
  }
}
