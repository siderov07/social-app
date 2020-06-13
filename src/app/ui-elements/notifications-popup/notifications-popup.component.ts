import { Component, OnInit } from '@angular/core';
import { INotification } from 'src/app/core/entities/notifications/notification.interface';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss'],
})
export class NotificationsPopupComponent implements OnInit {

  notificationsList: Array<INotification> = [];

  notificationMessage: string;

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationService.notificationsPopupList$
      .subscribe(list => this.notificationsList = list);
  }

  closeNotification(id: number): void {
    this.notificationsList = this.notificationsList.filter(x => x.id !== id);
  }
}
