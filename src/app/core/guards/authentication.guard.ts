import { Injectable } from '@angular/core';
import { Router, CanActivate, GuardsCheckEnd } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from 'src/app/modules/login/containers/login-page/login-page.component';
import { primaryModalConfig } from '../config/constants/modals-config';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private redirectUrl = '/'; // Default url to redirect

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dialog: MatDialog ) {}

  canActivate(): boolean {
    if (this.authService.getToken(true)) {
      return true;
    } else {
      // Enters here when the user isn't authenticated

      // Checks the activated route and updates 'redirectUrl'
      this.router.events
        .pipe(
          take(1),
          filter((event) => event instanceof GuardsCheckEnd)
        )
        .subscribe((route: GuardsCheckEnd) => {
          this.redirectUrl = route.url;

          // Show Login form
          const login$ = this.dialog.open(LoginPageComponent, {
            ...primaryModalConfig,
            data: { redirectUrl: this.redirectUrl },
          });

          // Closes dialog and returns to home page
          login$.backdropClick()
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/'));
        });
    }
  }
}
