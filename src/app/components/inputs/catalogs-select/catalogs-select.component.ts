import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-catalogs-select',
  templateUrl: './catalogs-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CatalogsSelectComponent),
      multi: true
    }
  ]
})
export class CatalogsSelectComponent implements ControlValueAccessor {

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

  @Input()
  catalogList: any;

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
