import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  contactTypes: { value: string, title: string, validators?: ValidatorFn[] }[] = [
    { value: 'Phone', title: 'Phone', validators: [Validators.required, this.phoneValidator()] },
    { value: 'E-mail', title: 'E-mail', validators: [Validators.required, Validators.email] },
    { value: 'Skype', title: 'Skype', validators: [Validators.required, this.skypeLoginValidator()] }
  ];

  optionsLang = [
    { lang: 'ru' },
    { lang: 'en' }
  ];
  currentLanguage: string = 'ru';

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, this.userNameValidator()]),
      address: this.fb.group({
        country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
      }),
      contacts: this.fb.array([]),
      passwords: this.fb.group({
        password: new FormControl('', [Validators.required]),
        confirm: new FormControl('', [Validators.required])
      }, { validator: this.passwordsAreEqual() })
    });

    this.addContact();
  }

  get contacts() {
    return this.form.get('contacts') as FormArray;
  }

  addContact() {
    const initType = this.contactTypes[0].value; // Phone

    this.contacts.push(this.fb.group({
      type: [initType, Validators.required],
      value: ['', this.getContactValidatorsByType(initType)]
    }));

    const contactControls = this.form.get('contacts')['controls'];
    const currentContactGroup = contactControls[contactControls.length - 1]; // последнюю добавленную

    currentContactGroup.get('type').valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((type: string) => {
        const valueCtrl: FormControl = currentContactGroup.get('value');
        console.log(this.getContactValidatorsByType(type));
        // this.getContactValidatorsByType(type) - возвращает валидатор для текущего типа в селекте (Phone, E-mail, Skype)
        valueCtrl.setValidators(this.getContactValidatorsByType(type));
        valueCtrl.updateValueAndValidity();
      });
  }

  remove(i) {
    this.contacts.removeAt(i);
  }

  submit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    alert('submit');
  }

  private userNameValidator(): ValidatorFn {
    const pattern: RegExp = /^[\w.$@*!]{5,30}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { validator: `Min length 5 symbol, can't contain whitespaces & special symbols.` };
      }
    }
  }

  private getContactValidatorsByType(type: string): ValidatorFn[] {
    console.log('getContactValidatorsByType', type);
    return this.contactTypes.filter((el: any) => el.value === type)[0].validators;
  }

  private passwordsAreEqual(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      if (!(group.dirty || group.touched) || group.get('password').value === group.get('confirm').value) {
        return null;
      }
      return {
        equal: 'Password are not Equal'
      };
    }
  }

  private phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { phone: `Invalid phone number` };
      }
    };
  }

  private skypeLoginValidator(): ValidatorFn {
    const pattern: RegExp = /^[a-z][a-z0-9\.,\-_]{5,31}$/i;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { skype: `Invalid skype login` };
      }
    };
  }

  private contactsLenValidator(): ValidatorFn {
    return (contacts: FormArray): { [key: string]: any } => {
      if (contacts.length !== 0) {
        return null;
      }
      return {
        contactsLength: 'At least one contact info should be added'
      };
    };
  }

  changeLanguage(language: string) {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
