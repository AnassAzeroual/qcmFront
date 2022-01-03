import { Directive, ElementRef, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'form[appFormReadonlyMode]'
})
export class FormReadonlyModeDirective {

  

   _readonly: boolean = false;
  formGroup: FormGroup;

  
  constructor(private el: ElementRef, private fg: FormGroupDirective) { 
    console.log('FormReadonlyModeDirective.constructor', el, fg);


    this.formGroup = fg.form;
  }



  @Input('readonly')
  set readonly(readonly: boolean) {
    this._readonly = readonly;


    if(this.formGroup){
      for (const field in this.formGroup.controls) { // 'field' is a string

        const control = this.formGroup.get(field); // 'control' is a FormControl  
        if(this._readonly) {
          control.disable();
        }
        else {
          control.enable();
        }
      
      }
    }
  }
}
