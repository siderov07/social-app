import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessages } from 'src/app/core/config/constants/error-messages';
import { PASSWORD_REGEX, USERNAME_REGEX } from 'src/app/validations/regexp';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../../../../../styles/ng-modificators/_touched-invalid.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  loginFail = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private dialog: MatDialogRef<LoginPageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public redirectUrl: {redirectUrl: string} | Array<null>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [this.auth.getLastUser(), [Validators.required, Validators.pattern(USERNAME_REGEX), Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.pattern(PASSWORD_REGEX), Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    this.auth.login({username, password}).subscribe(
      (onSuccess) => {

        // Checks if there is passed redirect URL from dialog, if there is not it redirects to home
        if (!Array.isArray(this.redirectUrl)) {
          this.router.navigateByUrl(this.redirectUrl.redirectUrl);
          this.dialog.close();
        }else{
          this.router.navigateByUrl('/');
        }
      },
      (onError) => {

        // Shows message for failed login resets password
        this.loginFail = true;
        this.loginForm.controls.password.reset();
      }
    );
  }

  get passwordValidationMessage(): string {
    let errorMessage = '';

    Object.keys(this.loginForm.controls.password.errors).find(error => {
      switch (error) {
        case 'minlength': errorMessage = ErrorMessages.PasswordMinLength; break;
        case 'required': errorMessage = ErrorMessages.RequiredField; break;
        case 'pattern': errorMessage = ErrorMessages.PasswordCharset; break;
        default: errorMessage = ErrorMessages.InvalidField;
      }
    });

    return errorMessage;
  }
}
