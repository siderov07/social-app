import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {

  usersList: Array<IUser> = [];
  searchValue: string;
  router$: Subscription;

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router$ = this.router.queryParams.subscribe(queryParams => {
      this.searchValue = queryParams.search;
      this.userService.getUsers().pipe(
        // Makes the search case insensitive
        map((data) => data.filter((x) => x.username.toLowerCase().includes(this.searchValue.toLowerCase())))
      )
      .subscribe(userData => {
        this.usersList = userData;
      });
    });
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
  }
}
