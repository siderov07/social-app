import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/config/theme/theme.service';
import { UserStoreService } from 'src/app/store/user-store.service';
import { NotificationsService } from '../../services/notifications.service';
import { INotification } from '../../entities/notifications/notification.interface';
import { IUser } from '../../entities/user/user.interface';
import { IJwtToken } from '../../entities/authentication/jwt-token.interface';

@Component({
  selector: 'app-top-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  loggedUser$: Observable<IUser | IJwtToken>;
  isUserLogged: boolean;
  notificationsList: Array<INotification>;

  constructor(
    private authService: AuthenticationService,
    private user: UserStoreService,
    private userStore: UserStoreService,
    private themeService: ThemeService,
    private notificationService: NotificationsService ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.userStore.loggedUser$;
    this.initNotifications();
    this.themeService.initializeTheme(this.isUserLogged);
  }

  // Gets the initial notifications
  initNotifications(): void {
    this.user.loggedUser$.subscribe((loggedUser: IUser | IJwtToken) => {
      this.isUserLogged = !!loggedUser;
      if (this.isUserLogged) {
        this.notificationService.getNotifications()
          .subscribe((notifications: Array<INotification>) => this.notificationsList = notifications );
      }
    });

    // Handles all new notifications and adding them to the notifications list
    this.notificationService.lastNotification$.subscribe((newNotification: INotification | null) => {
      if (newNotification && this.isUserLogged) {
        this.notificationsList = [newNotification, ...this.notificationsList];
      }
    });
  }

  readNotifications(): void {
    this.notificationsList.map(notification => {
      this.notificationService.readNotification(notification.id);

      setTimeout(() => {
        notification.status = 'read';
      }, 2500);
    });
  }

  logout(): void {
    this.authService.logout();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
