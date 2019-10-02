import { ICatalog } from 'src/app/models/catalog.model';
import { Component, forwardRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material';

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

  @Input()
  val: ICatalog[];

  @ViewChild(MatSelect, {static: false}) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  set value(val) {
    this.val = val ? val : [];
    this.onChanged(val);
    this.onTouched(val);
  }

  get value() {
    return this.val;
  }

  @Input()
  catalogList: any;

  isDisabled: boolean;

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

  compareObjects(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return null;
    }
    return  o1.id === o2.id;
  }

  selectionChanged(event: MatSelectChange) {
    this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
    this.onChanged(event.value);
    this.onTouched();
  }
}
