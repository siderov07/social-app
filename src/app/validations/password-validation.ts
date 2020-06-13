import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IFormErrors } from './form-errors.interface';

// To use it - always use 'password' and 'confirmPassword' for naming the form controls

export function passwordValidation(form: FormGroup): Observable<void> {
  return form.valueChanges.pipe(
    map(x => x.password === x.confirmPassword && x.password?.length >= 6),
    map((match: boolean) => match ? null : { notSame: true }),
    map((error: IFormErrors | null) => form.controls.confirmPassword.setErrors(error))
  );
}
