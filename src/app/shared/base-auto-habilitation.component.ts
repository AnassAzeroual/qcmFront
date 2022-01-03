import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiView } from './models/ui-view.model';
import { StaticDataService } from './services/static-data.service';

export abstract class BaseAutoHabilitationComponent {


  view: UiView;



  constructor(public staticDataService: StaticDataService, public authService: AuthService) { }



  private getView(viewName: string): Promise<any> {
    return this.staticDataService.getViewByName(viewName).toPromise();
  }


  public async applyHabilitationsToFormModelValues(viewName: string, model: any, form: FormGroup): Promise<any> {

    this.view = await this.getView(viewName);

    if (this.view && this.view.elements) {
      for (const element of this.view.elements.filter(elm => elm.typeElement === 'V')) {
        if (element.reglesValues && element.reglesValues.length) {
          // console.log('elemnt value ', element.code);


          for (const regle of element.reglesValues) {
            let regleHabilitation = null;
            if (regle.habilitation) {
              regleHabilitation = regle.habilitation.label;
            } else if (regle.role) {
              regleHabilitation = regle.role.label;
            }

            if (this.authService.getPrincipal().authorities.includes(regleHabilitation)) {
              if (regle.valueDefault != null) {    // default value
                // console.log('elemnt value setting default value', element.code, regle.valueDefault);
                model[element.code] = this.parseValue(regle.valueDefault, element.valueDatatype);

                form.get(element.code).setValue( model[element.code] );

                if (regle.lockedValue === 'O') {
                  form.get(element.code).disable();
                } else {
                  form.get(element.code).enable();
                }
              }

              break;
            }
          }
        }
      }
    }
  }




  private parseValue(valueString: string, datatype: string) {
    if (datatype === 'D' || datatype === 'I') {
      return +valueString;
    } else if (datatype === 'S') {
      return valueString;
    } else {
      console.error('error parseValue  unknown datatype ' + datatype);
    }
  }






  public async checkHabilitationsOfFormModelValues(viewName: string, form: FormGroup): Promise<string> { // return error message  or null if

    this.view = await this.getView(viewName);

    if (this.view && this.view.elements) {
      for (const element of this.view.elements.filter(elm => elm.typeElement === 'V')) {
        if (element.reglesValues && element.reglesValues.length) {
          // console.log('element value check', element.code);

          if (form.get(element.code).value != null) {    // element saisi

            for (const regle of element.reglesValues) {
              let regleHabilitation = null;
              if (regle.habilitation) {
                regleHabilitation = regle.habilitation.label;
              } else if (regle.role) {
                regleHabilitation = regle.role.label;
              }

              if (this.authService.getPrincipal().authorities.includes(regleHabilitation)) {
                if (regle.valueDefault != null) {    // default value
                  // console.log('elemnt value setting default value', element.code, regle.valueDefault);

                  if (regle.lockedValue === 'O' && (form.get(element.code).value != regle.valueDefault)) {
                    return 'Vous n\'avez pas le droit de changer la valeur de ' + element.code;
                  }
                }


                if (regle.minNumberValue != null || regle.maxNumberValue != null) {
                  // console.log('condition min', form.get(element.code).value, regle.minNumberValue);
                  // console.log('condition max', form.get(element.code).value, regle.maxNumberValue);
                  if (regle.minNumberValue != null && +form.get(element.code).value < regle.minNumberValue) {
                    return 'Vous n\'avez pas respecté la condition min ' + '(' + regle.minNumberValue + ') sur le champs ' + element.code;
                  }

                  if (regle.maxNumberValue != null && +form.get(element.code).value > regle.maxNumberValue) {
                    return 'Vous n\'avez pas respecté la condition max ' + '(' + regle.maxNumberValue + ') sur le champs ' + element.code;
                  }
                }


                break;
              }
            }
          }
        }
      }
    }


    return null;
  }



}
