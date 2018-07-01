import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FormService {

  private validationSource = new BehaviorSubject<boolean>(false);
  public validationObserver = this.validationSource.asObservable();

  validateAllFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control: any = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
    this.validationSource.next(true);
  }

}
