import { ValidationErrors } from '@angular/forms';

export interface IFormErrors extends ValidationErrors {
  notSame?: boolean;
}
