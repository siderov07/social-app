import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessages } from 'src/app/core/config/constants/error-messages';
import { Observable } from 'rxjs';
import { passwordValidation } from 'src/app/validations/password-validation';
import { IFormErrors } from 'src/app/validations/form-errors.interface';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from 'src/app/validations/regexp';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './register-page.component.html',
  styleUrls: [
    './register-page.component.scss',
    '../../../../../styles/ng-modificators/_touched-invalid.scss',
  ],
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  passwordMatch$: Observable<void>;
  registerFail: boolean | string = null;
  registerSuccess = false;

  constructor( private fb: FormBuilder, private auth: AuthenticationService ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(USERNAME_REGEX), Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: [null, [Validators.required,  Validators.pattern(PASSWORD_REGEX), Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(PASSWORD_REGEX), Validators.minLength(8)]],
    });

    this.passwordMatch$ = passwordValidation(this.registerForm);
  }

  onSubmit(): void {
    const { username, email, password } = this.registerForm.value;

    this.auth.register({username, email, password}).subscribe(
      (onSuccess) => {
        this.registerForm.reset();
        this.registerSuccess = true;
        this.registerFail = false;
      },
      (onError) => {
        this.registerForm.controls.password.reset();
        this.registerForm.controls.confirmPassword.reset();
        this.registerSuccess = false;
        this.registerFail = onError.error.message;
      }
    );
  }

  get passwordValidationMessage(): string {
    let errorMessage = '';

    Object.keys(this.registerForm.controls.password.errors as IFormErrors).find((error) => {
      switch (error) {
        case 'pattern': errorMessage = ErrorMessages.PasswordCharset; break;
        case 'minlength': errorMessage = ErrorMessages.PasswordMinLength; break;
        case 'required': errorMessage = ErrorMessages.RequiredField; break;
        default: errorMessage = ErrorMessages.InvalidField;
      }
    });

    return errorMessage;
  }

  get confirmPasswordValidationMessage(): string {
    let errorMessage = '';

    Object.keys(this.registerForm.controls.confirmPassword.errors as IFormErrors).find(
      (error) => {
        switch (error) {
          case 'minlength': errorMessage = ErrorMessages.PasswordMinLength; break;
          case 'required': errorMessage = ErrorMessages.RequiredField; break;
          case 'notSame': errorMessage = ErrorMessages.MissmatchPasswords; break;
          default: errorMessage = ErrorMessages.InvalidField;
        }
    });

    return errorMessage;
  }
}
