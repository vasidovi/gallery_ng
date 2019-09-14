import { Directive } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


export const passwordsMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');
  return password && passwordRepeat && (passwordRepeat.value !== password.value) ? { passwordsMismatch: true } : null;
}


@Directive({
  selector: '[appPasswordMismatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMismatchDirective, multi: true }]
})

export class PasswordMismatchDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    return passwordsMatch(control);
  }
}
