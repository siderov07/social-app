import { Component, Output, ViewChild, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';

@Component({
  selector: 'app-nav-user-profile',
  templateUrl: './nav-user-profile.component.html',
  styleUrls: ['./nav-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUserProfileComponent {

  @Input() currentUser: IUser | IJwtToken;

  @Output() changeTheme: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();

  @ViewChild('userProfileBtn') userProfileBtn: ElementRef;

  isProfileToggled = false;

  constructor() { }

  toggleProfile(): void {
    this.isProfileToggled = !this.isProfileToggled;
  }

  hideProfile(): void {
    this.isProfileToggled = false;
  }
}
