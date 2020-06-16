import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAvatarComponent } from '../../components/change-avatar/change-avatar.component';
import { DeleteProfileComponent } from '../../components/delete-profile/delete-profile.component';
import { take } from 'rxjs/operators';
import { RouterParams } from 'src/app/core/config/constants/routing';


@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  currentUser: IUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get(RouterParams.UserId);

    this.userService.getUserById(userId)
      .subscribe((user: IUser) => this.currentUser = user);
  }

  changeAvatar(): void {
    this.dialog.open(ChangeAvatarComponent).afterClosed()
    .pipe(take(1))
    .subscribe((data: IUser) => {
      this.currentUser = data ? data : this.currentUser;
    });
  }

  deleteProfile(): void {
    this.dialog.open(DeleteProfileComponent);
  }
}
