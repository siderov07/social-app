import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IJwtToken } from '../../entities/authentication/jwt-token.interface';
import { IUser } from '../../entities/user/user.interface';
import { UserStoreService } from 'src/app/store/user-store.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isToggled: boolean;
  isUserLogged$: Observable<IJwtToken | IUser>;

  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.isUserLogged$ = this.userStore.loggedUser$;
  }

  toggle(): void {
    this.isToggled = !this.isToggled;
  }

  hide(): void {
    this.isToggled = false;
  }
}
