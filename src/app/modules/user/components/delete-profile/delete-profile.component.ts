import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PASSWORD_REGEX } from 'src/app/validations/regexp';
import { ErrorMessages } from 'src/app/core/config/constants/error-messages';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';


@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss', '../../../../../styles/ng-modificators/_touched-invalid.scss']
})
export class DeleteProfileComponent implements OnInit {

  isLoading = false;
  deletionFail: string;
  loggedUser: IJwtToken;
  deleteProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteProfileComponent> ) { }

  ngOnInit(): void {
    this.deleteProfileForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.pattern(PASSWORD_REGEX), Validators.minLength(8)]],
      confirmation: ['', [Validators.required, this.validateDeleteConfirm]]
    });

    this.loggedUser = this.authService.getToken(true) as IJwtToken;
  }

  get passwordValidationMessage(): string {
    let errorMessage = '';

    Object.keys(this.deleteProfileForm.controls.password.errors).find(error => {
      switch (error) {
        case 'minlength': errorMessage = ErrorMessages.PasswordMinLength; break;
        case 'required': errorMessage = ErrorMessages.RequiredField; break;
        case 'pattern': errorMessage = ErrorMessages.PasswordCharset; break;
        default: errorMessage = ErrorMessages.InvalidField;
      }
    });

    return errorMessage;
  }

  validateDeleteConfirm(control: AbstractControl): { [key: string]: any } | null {
    return control.value !== 'Delete' ? { deleteConfirmed: true } : null;
  }

  onSubmit(): void {
    this.isLoading = true;
    this.deleteProfileForm.disable();
    this.dialogRef.disableClose = true;

    const username: string = this.loggedUser.username;
    const password: string = this.deleteProfileForm.controls.password.value;

    this.authService.login({ username, password }).subscribe(
      (onSuccess) => {
        this.userService.deleteUserProfile(username).subscribe(
          (onSuccessDeletion) => {
            this.authService.logout();

            this.dialogRef.close();
            this.dialog.open(MessageDialogComponent, {
              data: 'Your profile was successfully deleted.'
            });
          },
          (onDeletionError) => {
            this.isLoading = false;
            this.deleteProfileForm.enable();
            this.deletionFail = ErrorMessages.UnknownError;
            this.deleteProfileForm.reset();
            this.dialogRef.disableClose = true;
          });
      },
      (onError) => {
        this.isLoading = false;
        this.deleteProfileForm.enable();
        this.deletionFail = 'Invalid password!';
        this.deleteProfileForm.reset();
        this.dialogRef.disableClose = true;
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
