import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UiView } from '../../models/ui-view.model';
import { AlertService } from '../../services/alert.service';
import { UserInputService } from '../../services/user-input.service';
import { IHabilitation } from '../models/habilitation.model';
import { IRole } from '../models/role.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-views-habilitations',
  templateUrl: './views-habilitations.component.html',
  styleUrls: ['./views-habilitations.component.scss']
})
export class ViewsHabilitationsComponent implements OnInit {


  models : any;

  model : UiView;
  editForm: FormGroup;
  isFormReady = false;
  submitted : boolean = false;
  habilitations: IHabilitation[];
	roles: IRole[];




  constructor(private adminService: AdminService, 
                private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute,
								private userInputService: UserInputService, ) { }

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
		this.loadModels( 1 );
  }


	
	
	
	public loadModels(page: number) {
  	this.adminService.getListUiViews(page-1, 5)
                .subscribe(
                      (data: any) => {
                        this.models = data;
                      }
                    );
  }
  


	
  
  public loadModel(view: UiView) {
		this.model = view;
		this.initForm();
  }
	
  
  public newModel() {
		this.model = new UiView();
		this.initForm();
  }
  
  

  public loadSubModels(view: UiView) {
    this.router.navigateByUrl('/shared/admin/viewelements?viewid='+view.id);
  }
	

  private initForm() {
    
    this.editForm = new FormGroup({
      'name':   new FormControl(this.model.name,      [Validators.required,  Validators.maxLength(100), ]),
      
			'habilitations': new FormArray([]),
			'roles': new FormArray([]),
    });
    
    this.isFormReady = true;

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

    this.editForm.setControl('habilitations', formHabilitations);
    
		

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



  }


 

  onSubmit() {
    if(this.editForm.valid) {
      let formValue = this.editForm.value;
      console.log(formValue)
      this.model.name = (formValue.name ? formValue.name: null);
      
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
      console.log(this.model)
                  
        this.adminService.saveUiView(this.model)
                .subscribe(
                      (data: any) => {
												this.alertService.info('View Saved');
												this.editForm.reset();
												this.isFormReady = false;
												this.loadModels( 1 );
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
		this.editForm.reset();
		this.isFormReady = false;
  }


	onRemoveView(viewId: number) {
		this.userInputService.confirm(null, null).then(
				(result) => {
						this.adminService.deleteUiView(viewId)
                .subscribe(
                      (data: any) => {
												this.alertService.info('View removed');
												this.loadModels( 1 );
                      }
                    );
				}, 
				(reason) => {}
		);
	}


  
  get name() {
    return this.editForm.get('name');
  }
  










}
