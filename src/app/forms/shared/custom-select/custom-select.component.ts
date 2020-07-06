import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SelectOption } from "../interfaces/selectOption";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit {

  innerValue = '';
  open = false;
  // placeholder: string = 'Select'; // заменили на геттер
  selectedOption: SelectOption;
  @Input() options: SelectOption[] = [];

  constructor() { }

  ngOnInit(): void { }

  /*заменяем на writeValue*/
  // set value(value: string) {
  //   if (value !== this.innerValue) {
  //     this.innerValue = value;
  //     this.open = false;
  //   }
  // }
  //
  // get value(): string {
  //   return this.innerValue;
  // }
  /*заменяем на writeValue*/

  get placeholder(): string {
    return this.selectedOption && this.selectedOption.hasOwnProperty('title') ? this.selectedOption.title : 'Select';
  }

  optionSelect(option: SelectOption) {
    this.writeValue(option.value);
    this.onTouched();
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  get isOpen(): boolean {
    return this.open;
  }

  writeValue(value) {
    if (!value || typeof value !== 'string') {
      return
    }
    const selectedEl = this.options.find(el => el.value === value);
    if (selectedEl) {
      this.selectedOption = selectedEl;
      this.onChange(this.selectedOption.value);
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
