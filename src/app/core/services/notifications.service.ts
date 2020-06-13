import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { INotification } from '../entities/notifications/notification.interface';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../config/api/api-routes';
import { take } from 'rxjs/operators';

@Injectable()
export class NotificationsService {

  clearPopupTimeout: any;
  socket: Socket;
  lastNotification$: Subject<INotification> = new Subject();
  notificationsPopupList$: Subject<Array<INotification>> = new Subject();
  notificationsList: Array<INotification> = [];
  isUserLogged: boolean;

  constructor(private auth: AuthenticationService, private http: HttpClient) {

    this.socket = io(environment.apiUrl);

    this.auth.token$.subscribe((token: string) => {

      this.isUserLogged = !!token;

      this.socket.emit('leave');

      if (this.isUserLogged) {
        this.socket.emit('join', token);

      } else {
        this.clearNotification();
      }
    });

    // Handles functionality for all notifications
    this.socket.on('notifications',
      (notification: INotification) => this.emitNotifications(notification));
  }

  // Emits last notification and array of the last notifications within the timeout
  emitNotifications(notification: INotification): void {
    if (this.isUserLogged) {
      this.notificationsList.push(notification);
      this.notificationsPopupList$.next(this.notificationsList);
      this.lastNotification$.next(notification);
    }

    this.handleClearTimeout();
  }

  // Updates timeout to clear pop notifications and clear them the the timeout
  handleClearTimeout(): void {
    if (this.clearPopupTimeout) {
      clearTimeout(this.clearPopupTimeout);
    }

    this.clearPopupTimeout = setTimeout(() => {
      this.clearNotification();
    }, 6000);
  }

  readNotification(notificationId: number): void {
    this.socket.emit('readNotification', notificationId);
  }

  getNotifications(): Observable<Array<INotification>> {
    return this.http.get<Array<INotification>>(`${ApiRoutes.Notifications}/${ApiRoutes.Likes}`).pipe(take(1));
  }

  clearNotification(): void {
    this.notificationsPopupList$.next(null);
    this.notificationsList = [];
  }
}
