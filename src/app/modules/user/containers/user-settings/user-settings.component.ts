import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAvatarComponent } from 'src/app/ui-elements/change-avatar/change-avatar.component';
import { DeleteProfileComponent } from 'src/app/ui-elements/delete-profile/delete-profile.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  currentUser: IUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('userId');

    this.userService.getUserById(userId)
      .subscribe((user: IUser) => this.currentUser = user);
  }

  changeAvatar(): void {
    this.dialog.open(ChangeAvatarComponent).afterClosed().subscribe((data: IUser) => {
      this.currentUser = data ? data : this.currentUser;
    });
  }

  deleteProfile(): void {
    this.dialog.open(DeleteProfileComponent);
  }
}
