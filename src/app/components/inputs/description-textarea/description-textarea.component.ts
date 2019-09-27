
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-description-textarea',
  templateUrl: './description-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DescriptionTextareaComponent),
      multi: true
    }
  ]
})
export class DescriptionTextareaComponent implements ControlValueAccessor {

  set value(val) {
    this.val = val ? val : [''];
    this.onChanged(val);
    this.onTouched(val);
  }

  get value() {
    return this.val;
  }

  @Input()
  val;

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
}
