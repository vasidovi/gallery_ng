import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameInputComponent),
      multi: true
    }
  ]
})
export class NameInputComponent implements ControlValueAccessor {

  set value(val) {
    this.val = val ? val : '';
    this.onChanged(val);
    this.onTouched(val);
  }

  @Input()
  val = '';
  isDisabled: boolean;

  onChanged: any = () => { };
  onTouched: any = () => { };

  constructor() { }

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

    return validations.hasError('required') ? 'Name is required' :
          '';
    }

}
