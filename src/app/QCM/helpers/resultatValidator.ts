import { FormGroup, ValidatorFn } from "@angular/forms";


export function correctValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    


    let checked = 0;
    let res = null
    for (const choix of formGroup.value) {
      res = (choix.correct != choix.choisi)
      ?{requireCheckboxToBeChecked: true}
      :{requireCheckboxToBeChecked: false};
    }

   


    return res;
  };
}