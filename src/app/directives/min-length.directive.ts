import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appMinLength]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinLengthDirective, multi: true }]

})

export class MinLengthDirective implements Validator {

  @Input('appMinLength') minLenght: number;

  validate(control: AbstractControl): ValidationErrors {
    if (control.value && control.value.length > this.minLenght && control.value.trim().length < this.minLenght) {
      return { validLength: true };
    }
    return null;
  }
}
