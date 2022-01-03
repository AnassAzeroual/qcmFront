import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AdminService } from '../services/admin.service';
import { AlertService } from '../../services/alert.service';
import { UserInputService } from '../../services/user-input.service';
import { IAdministredUser, AdministredUser } from '../models/administred-user.model';
import { IRole } from '../models/role.model';
import { IRoleFonctionnel } from '../models/role-fonctionnel.model';
import { IHabilitation } from '../models/habilitation.model';

import * as commons from '../..';		// contains compareObjetFn


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	
  models : any;
	
  model : IAdministredUser;
  editForm: FormGroup;
  isFormReady = false;
  submitted : boolean = false;
	
	roles: IRole[];
	rolesFonctionnels: IRoleFonctionnel[];
	compareFn = commons.compareObjetFn.bind(this);
	
	habilitations: IHabilitation[];
	

  constructor(private adminService: AdminService, 
								private alertService: AlertService,
								private userInputService: UserInputService,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location,
								private modalService: NgbModal, ) { }

 
	
	
	ngOnInit() {
		
		this.adminService.getListRoles()
								.subscribe(
                      (data: any) => {
                        this.roles = data;
                      }
                    );
		
    this.adminService.getListRolesFonctionnels()
                .subscribe(
                      (data: any) => {
                        this.rolesFonctionnels = data;
                      }
                    );
		
		this.adminService.getListHabilitations()
								.subscribe(
                      (data: any) => {
                        this.habilitations = data;
                      }
                    );
		
		
		
		
		
		this.loadModels( 1 );
  }
	
	
	
	
	
	public loadModels(page: number) {
  	this.adminService.getListUsers(  page-1, 10   )
                .subscribe(
                      (data: any) => {
                        this.models = data;
                      }
                    );
	}
	
  
  public loadModel(user: IAdministredUser) {
		this.model = user;
		this.initForm();
  }
	
  
  public newModel() {
		this.model = new AdministredUser();
		this.initForm();
  }
	
	

  private initForm() {
    
    this.editForm = new FormGroup({
    	'firstname':   new FormControl(this.model.firstname,      [ Validators.maxLength(40), ]),
    	'lastname':   new FormControl(this.model.lastname,      [ Validators.maxLength(40), ]),
      'city': new FormControl(this.model.city, []),
    	'email':   new FormControl(this.model.email,      [Validators.required,  Validators.email,  Validators.maxLength(60), ]),
    	'username':   new FormControl(this.model.username,      [Validators.required,  Validators.maxLength(60), ]),
			'passwordGroupData': new FormGroup({
						'newPassword':   new FormControl(null,      [ ]),
						'confirmPass': new FormControl('', [])
						}, [this.checkPasswords.bind(this)]),
    	'logo':   new FormControl(this.model.logo,      [ ]),
			'disabledCause':   new FormControl(this.model.disabledCause,      [Validators.maxLength(100), ]),
			'role':   new FormControl(this.model.role,      [Validators.required,  ]),
						
			'roles': new FormArray([]),
			'rolesFonctionnels': new FormArray([]),

			'habilitations': new FormArray([]),
			'prohibitions': new FormArray([]),
    });
		

    
		

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

    this.editForm.setControl('roles', formRoles);




		

    const formRolesFonctionnels = new FormArray([]);

    for (const roleFunc of this.rolesFonctionnels) {
      formRolesFonctionnels.push(
        new FormGroup({
						'checked': new FormControl(  !this.model.rolesFonctionnels ? null : Boolean(this.model.rolesFonctionnels.find( elm => elm.id === roleFunc.id )),   [ ]),
						'id': new FormControl(   {value: roleFunc.id,  disabled: true},      [ ]),
						'label': new FormControl(   {value: roleFunc.label,  disabled: true},      [ ]),
        })
      );
    }

    this.editForm.setControl('rolesFonctionnels', formRolesFonctionnels);






    const formDetails = new FormArray([]);

    for (const hab of this.habilitations) {
      formDetails.push(
        new FormGroup({
						'checked': new FormControl(  !this.model.listOfHabilitations ? null : Boolean(this.model.listOfHabilitations.find( elm => elm.id === hab.id )),   [ ]),
						'id': new FormControl(   {value: hab.id,  disabled: true},      [ ]),
						'label': new FormControl(   {value: hab.label,  disabled: true},      [ ]),
        })
      );
    }

    this.editForm.setControl('habilitations', formDetails);
		
		
		
		
		

    const formDetails2 = new FormArray([]);

    for (const hab of this.habilitations) {
      formDetails2.push(
        new FormGroup({
						'checked': new FormControl( Boolean(   !this.model.listOfInterdictions?  null  :   this.model.listOfInterdictions.find( elm => elm.id === hab.id )),   [ ]),
						'id': new FormControl(   {value: hab.id,  disabled: true},      [ ]),
						'label': new FormControl(   {value: hab.label,  disabled: true},      [ ]),
        })
      );
    }

    this.editForm.setControl('prohibitions', formDetails2);
		
    
    this.isFormReady = true;
  }



  onSubmit() {
    if(this.editForm.valid) {
      let formValue = this.editForm.value;

      this.model.firstname = (formValue.firstname ? formValue.firstname: null);
      this.model.lastname = (formValue.lastname ? formValue.lastname: null);
      this.model.city = formValue.city;
      this.model.email = (formValue.email ? formValue.email: null);
      this.model.username = (formValue.username ? formValue.username: null);
      this.model.newPassword = (formValue.passwordGroupData.newPassword ? formValue.passwordGroupData.newPassword: null);
      this.model.logo = (formValue.logo ? formValue.logo: null);
      this.model.disabledCause = (formValue.disabledCause ? formValue.disabledCause: null);
      this.model.role = (formValue.role ? formValue.role: null);
      
      this.model.roles = [];
			for(let i=0 ; i<this.roles.length ; i++) {
				if(formValue.roles[i].checked)
					this.model.roles.push(  this.roles[i]  );
			}
      
      
      this.model.rolesFonctionnels = [];
			for(let i=0 ; i<this.rolesFonctionnels.length ; i++) {
				if(formValue.rolesFonctionnels[i].checked)
					this.model.rolesFonctionnels.push(  this.rolesFonctionnels[i]  );
			}

      
			this.model.listOfHabilitations = [];
			for(let i=0 ; i<this.habilitations.length ; i++) {
				if(formValue.habilitations[i].checked)
					this.model.listOfHabilitations.push(  this.habilitations[i]  );
			}
      
			this.model.listOfInterdictions = [];
			for(let i=0 ; i<this.habilitations.length ; i++) {
				if(formValue.prohibitions[i].checked)
					this.model.listOfInterdictions.push(  this.habilitations[i]  );
			}
			
			
			//console.log(this.model);
                  
//*
        this.adminService.saveUser(this.model)
                .subscribe(
                      (data: any) => {
												this.alertService.info('User Saved');
												this.editForm.reset();
												this.isFormReady = false;
												this.loadModels( 1 );
                      }
                    );
//*/
										
      this.submitted = false;
    }
    else {
      console.log('form not valid');
      this.submitted = true;
    }
  }


  
  onCancel() {
		this.editForm.reset();
		this.isFormReady = false;
  }


	onRemoveUser(idhash: string) {
		this.userInputService.getStringInput('Disabling a user', 'What is the reason?').then(
				(result) => {
						this.adminService.deleteUser(idhash, result)
                .subscribe(
                      (data: any) => {
												this.alertService.info('User removed');
												this.loadModels( 1 );
                      }
                    );
				}, 
				(cancel) => {}
		);
	}


	onRestoreUser(idhash: string) {
		this.userInputService.confirm(null, null).then(
				(result) => {
						this.adminService.restoreUser(idhash)
                .subscribe(
                      (data: any) => {
												this.alertService.info('User restored');
												this.loadModels( 1 );
                      }
                    );
				}, 
				(cancel) => {}
		);
	}


  


  
  get firstname() {
    return this.editForm.get('firstname');
  }
  
  get lastname() {
    return this.editForm.get('lastname');
  }
  
  get country() {
    return this.editForm.get('country');
  }
  
  get city() {
    return this.editForm.get('city');
  }
    
  get email() {
    return this.editForm.get('email');
  }
  
  get username() {
    return this.editForm.get('username');
  }
  
  get passwordGroupData() {
    return this.editForm.get('passwordGroupData');
  }
  
  get newPassword() {
    return this.editForm.get('passwordGroupData.newPassword');
  }
  
  get confirmPass() {
    return this.editForm.get('passwordGroupData.confirmPass');
  }
  
  get logo() {
    return this.editForm.get('logo');
  }
  
  get disabledCause() {
    return this.editForm.get('disabledCause');
  }
    
  get role() {
    return this.editForm.get('role');
  }
  
  
  


  
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
	  let newPass = group.controls.newPassword.value;
	  let confirmPass = group.controls.confirmPass.value;

		if( newPass && newPass !== confirmPass  )
			return { notSame: true };   
		else
			return null;
  }


	

}
