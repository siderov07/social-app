import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/core/entities/user/user.interface';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent {
  @Input () user: IUser;

  constructor() { }
}
