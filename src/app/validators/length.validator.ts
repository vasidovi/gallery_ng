import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateLength(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.trim().length < limit) {
        return { validLength: true };
      }
      return null;
    };
  }
