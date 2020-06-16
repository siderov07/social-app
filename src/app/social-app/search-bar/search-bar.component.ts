import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, EMPTY } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { map, switchMap, debounceTime, tap } from 'rxjs/operators';
import { IUser } from 'src/app/core/entities/user/user.interface';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/core/config/constants/routing';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit {

  private searchValue = '';
  isLoading: boolean;
  isResultsHidden: boolean;
  usersList: Array<IUser> = [];

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        tap(() => this.isLoading = true),
        debounceTime(400),
        map((x: InputEvent) => (x.target as HTMLInputElement).value),
        // Checks is the input field is empty
        map((data: string) => {
          if (data) {
            this.searchValue = data;
            return data;
          } else {
            this.isLoading = false;
            this.usersList = [];
            this.searchValue = '';
            return false;
          }
        }),
        switchMap((hasSearchParam: string | boolean) => {
          if (hasSearchParam) {
            return this.userService.getUsers().pipe(
              map((data) => data.filter((x) => x.username.toLowerCase().includes(this.searchValue.toLowerCase())))
            );
          }else {
            return EMPTY;
          }
        })
      )
      .subscribe((data) => {
        this.usersList = this.searchValue ? data.slice(0, 5) : [];
        this.isResultsHidden = false;
        this.isLoading = false;
      });
  }

  hide(): void {
    this.isLoading = false;
    this.isResultsHidden = true;
  }

  toggleResults(): void {
    if (this.usersList.length && this.searchValue) {
      this.isResultsHidden = false;
    }
  }

  showAllResults(): void {
    this.isResultsHidden = true;

    if (this.searchValue.length) {
      this.router.navigate([`/${AppRoutes.UserSearch}`], {queryParams: {search: this.searchValue}});
    }
  }
}
