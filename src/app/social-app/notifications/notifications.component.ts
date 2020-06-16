import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { INotification } from 'src/app/core/entities/notifications/notification.interface';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationsComponent {

  @Input() notifications: Array<INotification>;

  @Output() readNotifications: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('notificationsBtn') notificationsBtn: ElementRef;

  isNotificationsToggled = false;

  constructor() { }

  getUnreadNotifications(): number {
    return this.notifications?.filter(x => x.status === 'unread').length;
  }

  toggleNotifications(): void {
    this.isNotificationsToggled = !this.isNotificationsToggled;

    if (this.isNotificationsToggled && this.notifications?.length && this.getUnreadNotifications() > 0) {
      this.readNotifications.emit(true);
    }
  }

  hideNotifications(): void {
    this.isNotificationsToggled = false;
  }
}

