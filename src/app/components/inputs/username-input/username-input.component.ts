import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsernameInputComponent),
      multi: true
    }
  ]
})
export class UsernameInputComponent implements ControlValueAccessor {

  set value(val) {
    this.val = val;
    this.onChanged(val);
    this.onTouched(val);
  }


  constructor() { }

  val = '';
  isDisabled: boolean;

  @Input()
  public required = false;
  @Input()
  public placeholder = 'Enter your username';
  @Input()
  public appMinLength = 0;

  onChanged: any = () => { };
  onTouched: any = () => { };

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

    return validations.hasError('required') ? 'Username is required' :
        validations.hasError('validLength') ? 'Username must be at least ' + this.appMinLength + ' symbols' :
          '';
    }
}
