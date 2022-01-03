import { FormGroup, ValidatorFn } from "@angular/forms";

export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    // console.log("atLeastOneCheckboxCheckedValidator ",formGroup.value);
    // console.log(formGroup);
    


    let checked = 0;
    // console.log(question.choix);
    for (const choix of formGroup.value) {
      if(choix.correct == true) {
        checked++;
      }
    }

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,

      };
    }


    return null;
  };
}

