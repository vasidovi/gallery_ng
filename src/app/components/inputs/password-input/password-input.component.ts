import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})

export class PasswordInputComponent implements ControlValueAccessor {

  set value(val) {
    this.val = val;
    this.onChanged(val);
    this.onTouched(val);
  }

  val = '';
  isDisabled: boolean;
  hidePassword: boolean;

  @Input()
  public required = false;
  @Input()
  public placeholder = 'Enter your password';
  @Input()
  public appMinLength = 0;

  onChanged: any = () => { };
  onTouched: any = () => { };

  constructor() {
    this.hidePassword = true;
   }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getErrorMessage(validations: NgModel): string {

    return validations.hasError('required') ? 'Password is required' :
        validations.hasError('validLength') ? 'Password must be at least ' + this.appMinLength + ' symbols' :
          '';
    }
}
