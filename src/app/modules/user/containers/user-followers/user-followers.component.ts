import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {

  currentUser: IUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.userService.getUserById(userId)
    .subscribe((user: IUser) => this.currentUser = user );
  }

}
