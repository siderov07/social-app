import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { RouterParams } from 'src/app/core/config/constants/routing';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.scss'],
})
export class UserFollowingComponent implements OnInit {

  currentUser: IUser;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get(RouterParams.UserId);
    this.userService.getUserById(userId)
    .subscribe((user: IUser) => this.currentUser = user );
  }
}
