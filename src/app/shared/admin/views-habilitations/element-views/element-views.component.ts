import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { AdminService } from '../../services/admin.service';
import { AlertService } from '../../../services/alert.service';
import { UiViewElement } from '../../../models/ui-view-element.model';
import { UiView } from 'src/app/shared/models/ui-view.model';
import { IHabilitation } from '../../models/habilitation.model';
import { IRole } from '../../models/role.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { RegleValueView } from 'src/app/shared/models/regle-value-view.model';


import * as commons from '../../..';		// contains compareObjetFn
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-element-views',
  templateUrl: './element-views.component.html',
  styleUrls: ['./element-views.component.scss']
})
export class ElementViewsComponent implements OnInit {

  viewid: number;
  view: UiView;
  models : any;

  model : UiViewElement;
  editElementForm: FormGroup;
  isFormReady = false;
  submitted : boolean = false;
	
	habilitations: IHabilitation[];
	roles: IRole[];


  compareFn = commons.compareObjetFn.bind(this);
  


  regleModel : RegleValueView;
  editRegleForm: FormGroup;
  isSubFormReady = false;
  submittedRegleForm : boolean = false;




  constructor(private adminService: AdminService, 
                private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location, 
								private userInputService: UserInputService, 
                private modalService: NgbModal, ) { }

  ngOnInit() {
    
		
		this.adminService.getListRoles()
    .subscribe(
          (data: any) => {
            this.roles = data;
          }
        );

    this.adminService.getListHabilitations()
        .subscribe(
              (data: any) => {
                this.habilitations = data;
              }
            );


            
    this.route.queryParams
      .subscribe(
        (params: Params) => {
           if(params['viewid']){
              this.viewid = +params['viewid'];
              console.log( this.viewid );
              this.loadModels( );
           }
        }
    );
  }


	
	
	
	public loadModels() {
  	this.adminService.getUiViewById(this.viewid)
                .subscribe(
                      (data: any) => {
                        this.view = data;

                        this.models = this.view.elements;
                      }
                    );
	}

  
  
  
  public loadModel(element: UiViewElement) {
		this.model = element;
		this.initForm();
  }



	
  
  public newModel() {
		this.model = new UiViewElement();
    this.model.reglesValues = [];
		this.initForm();
  }


  private initForm() {
    
    this.editElementForm = new FormGroup({
      'code':   new FormControl(this.model.code,      [Validators.required,  Validators.maxLength(50), ]),
      'label':   new FormControl(this.model.label,      [Validators.required,  Validators.maxLength(100), ]),
      'typeElement':   new FormControl(this.model.typeElement,      [ Validators.required,  Validators.maxLength(1), ]),
      'typeDesactivation':   new FormControl(this.model.typeDesactivation,      [ Validators.maxLength(1), ]),
      'messageDesactivation':   new FormControl(this.model.messageDesactivation,      [ Validators.maxLength(255), ]),
      
      'valueDatatype':   new FormControl(this.model.valueDatatype,      [ Validators.maxLength(1), ]),

      // 'regles': new FormArray([]),
      
			'habilitations': new FormArray([]),
			'roles': new FormArray([]),
    });



    
		

    // const formRegles = new FormArray([]);

    // for (const regle of this.model.reglesValues) {
    //   formRegles.push(
    //     this.createRegleValueViewFormGroup(regle)
    //   );
    // }

    // this.editElementForm.setControl('regles', formRegles);
    
		
    
		

    const formHabilitations = new FormArray([]);

    for (const hab of this.habilitations) {
      formHabilitations.push(
        new FormGroup({
						'checked': new FormControl(  !this.model.habilitations ? null : Boolean(this.model.habilitations.find( elm => elm.id === hab.id )),   [ ]),
						'id': new FormControl(   {value: hab.id,  disabled: true},      [ ]),
						'label': new FormControl(   {value: hab.label,  disabled: true},      [ ]),
        })
      );
    }

    this.editElementForm.setControl('habilitations', formHabilitations);
    
		

    const formRoles = new FormArray([]);

    for (const role of this.roles) {
      formRoles.push(
        new FormGroup({
						'checked': new FormControl(  !this.model.roles ? null : Boolean(this.model.roles.find( elm => elm.id === role.id )),   [ ]),
						'id': new FormControl(   {value: role.id,  disabled: true},      [ ]),
						'label': new FormControl(   {value: role.label,  disabled: true},      [ ]),
        })
      );
    }

    this.editElementForm.setControl('roles', formRoles);





    
    this.isFormReady = true;
  }





  // private createRegleValueViewFormGroup(regle: RegleValueView): FormGroup {
  //   return new FormGroup({
  //         });
  // }

  


  onSubmit() {
    if(this.editElementForm.valid) {
      let formValue = this.editElementForm.value;

      this.model.code = (formValue.code ? formValue.code: null);
      this.model.label = (formValue.label ? formValue.label: null);
      this.model.typeElement = (formValue.typeElement ? formValue.typeElement: null);
      this.model.typeDesactivation = (formValue.typeDesactivation ? formValue.typeDesactivation: null);
      this.model.messageDesactivation = (formValue.messageDesactivation ? formValue.messageDesactivation: null);
      
      this.model.valueDatatype = (formValue.valueDatatype ? formValue.valueDatatype: null);
      
			// this.model.reglesValues = [];
			// for(let i=0 ; i<formValue.regles.length ; i++) {
      //   const newRegle: RegleValueView = new RegleValueView();

      //   newRegle.valueDefault = (formValue.valueDefault ? formValue.valueDefault: null);
      //   newRegle.minNumberValue = (formValue.minNumberValue != null ? +formValue.minNumberValue: null);
      //   newRegle.maxNumberValue = (formValue.maxNumberValue != null ? +formValue.maxNumberValue: null);
      //   newRegle.lockedValue = (formValue.lockedValue ? formValue.lockedValue: null);
      //   // .listPossibleValues = (formValue.listPossibleValues ? formValue.listPossibleValues: null);

			// 	this.model.reglesValues.push(  newRegle  );
			// }      
      
      
      
			this.model.habilitations = [];
			for(let i=0 ; i<this.habilitations.length ; i++) {
				if(formValue.habilitations[i].checked)
					this.model.habilitations.push(  this.habilitations[i]  );
			}      
      
      
			this.model.roles = [];
			for(let i=0 ; i<this.roles.length ; i++) {
				if(formValue.roles[i].checked)
					this.model.roles.push(  this.roles[i]  );
      }
      



        this.adminService.saveUiViewElement(this.viewid, this.model)
                .subscribe(
                      (data: any) => {
                          this.alertService.info('ElementView Successfuly Saved.');
                          this.editElementForm.reset();
                          this.isFormReady = false;
                          this.loadModels( );
                          // this._location.back();
                      }
                    );

      
      this.submitted = false;
    }
    else {
      console.log('form not valid');
      this.submitted = true;
    }
  }
  
  onCancel() {
		this.editElementForm.reset();
		this.isFormReady = false;
  }


  goToViews() {
    this.router.navigateByUrl('/shared/admin/views');
  }



	onRemoveElementView(viewElementId: number) {
		this.userInputService.confirm(null, null).then(
				(result) => {
						this.adminService.deleteUiViewElement(viewElementId)
                .subscribe(
                      (data: any) => {
												this.alertService.info('View removed');
												this.loadModels( );
                      }
                    );
				}, 
				(reason) => {}
		);
	}


  get code() {
    return this.editElementForm.get('code');
  }
  
  get label() {
    return this.editElementForm.get('label');
  }
  
  get typeElement() {
    return this.editElementForm.get('typeElement');
  }
  
  get typeDesactivation() {
    return this.editElementForm.get('typeDesactivation');
  }
  
  get messageDesactivation() {
    return this.editElementForm.get('messageDesactivation');
  }
  
  
  get valueDatatype() {
    return this.editElementForm.get('valueDatatype');
  }









  
  
  public loadRegle(modalRegleContent: any, regle: RegleValueView) {
		this.regleModel = regle;
		this.initRegleForm();


    this.modalService
      .open(modalRegleContent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          console.log(result);
        },
        reason => {
          console.log('Err!', reason);
        }
    );
  }



	
  
  public newRegle(modalRegleContent: any) {
    this.regleModel = new RegleValueView();
		this.initRegleForm();



    this.modalService
      .open(modalRegleContent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          console.log(result);
        },
        reason => {
          console.log('Err!', reason);
        }
    );
  }




  private initRegleForm() {
    
    this.editRegleForm = new FormGroup({
          'habilitation':   new FormControl(this.regleModel.habilitation,      [  ]),
          'role':   new FormControl(this.regleModel.role,      [  ]),
          'valueDefault':   new FormControl(this.regleModel.valueDefault,      [ Validators.maxLength(255), ]),
          'minNumberValue':   new FormControl(this.regleModel.minNumberValue,      [ ]),
          'maxNumberValue':   new FormControl(this.regleModel.maxNumberValue,      [ ]),
          'lockedValue':   new FormControl(this.regleModel.lockedValue,      [ Validators.maxLength(1), ]),

    });

    this.isSubFormReady = true;
  }





  onSubmitRegle(modalRegleRef: any) {
    if(this.editRegleForm.valid) {
      let formValue = this.editRegleForm.value;

      this.regleModel.habilitation = formValue.habilitation;
      this.regleModel.role = formValue.role;
      this.regleModel.valueDefault = (formValue.valueDefault ? formValue.valueDefault: null);
      this.regleModel.minNumberValue = (formValue.minNumberValue != null ? +formValue.minNumberValue: null);
      this.regleModel.maxNumberValue = (formValue.maxNumberValue != null ? +formValue.maxNumberValue: null);
      this.regleModel.lockedValue = (formValue.lockedValue ? formValue.lockedValue: null);
      //   // .listPossibleValues = (formValue.listPossibleValues ? formValue.listPossibleValues: null);

      if( !this.regleModel.id ) {
        this.model.reglesValues.push(  this.regleModel  );
      }
      
        this.isSubFormReady = false;
      

      
      this.submittedRegleForm = false;


      modalRegleRef.dismiss('Submit');
    }
    else {
      console.log('form not valid');
      this.submittedRegleForm = true;
    }
  }
  
  onCancelRegle() {
		this.editRegleForm.reset();
		this.isSubFormReady = false;
  }


  

	onRemoveRegleByIndex(regleIndex: number) {
    this.model.reglesValues.splice(regleIndex, 1);
	}

  
  get habilitation() {
    return this.editRegleForm.get('habilitation');
  }

  
  get role() {
    return this.editRegleForm.get('role');
  }

  
  get valueDefault() {
    return this.editRegleForm.get('valueDefault');
  }
  
  get minNumberValue() {
    return this.editRegleForm.get('minNumberValue');
  }
  
  get maxNumberValue() {
    return this.editRegleForm.get('maxNumberValue');
  }
  
  get lockedValue() {
    return this.editRegleForm.get('lockedValue');
  }
  
  get listPossibleValues() {
    return this.editRegleForm.get('listPossibleValues');
  }
  

}
