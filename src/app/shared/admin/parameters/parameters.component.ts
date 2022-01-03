import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { AdminService } from '../services/admin.service';
import { AlertService } from '../../services/alert.service';
import { IParameter, Parameter } from '../models/parameter.model';
import { IParameterKey } from '../models/parameter-key.model';
import { UserInputService }  from '../../services/user-input.service';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
	
  models : any;
	
  model : IParameter;
  editForm: FormGroup;
  isFormReady = false;
  submitted : boolean = false;
	
	
	
	keys : IParameterKey[];
	

  constructor(private adminService: AdminService, 
								private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location,
								private userInputService: UserInputService, ) { }

 
	
	
	ngOnInit() {
		
		this.adminService.getListParameterKeys()
								.subscribe(
                      (data: any) => {
                        this.keys = data;
                      }
                    );
		
		
		
		this.loadModels( 1 );
  }
	
	
	
	
	
	public loadModels(page: number) {
  	this.adminService.getListParameters(  page-1, 2   )
                .subscribe(
                      (data: any) => {
                        this.models = data;
                      }
                    );
	}
	
  
  public loadModel(parameter: IParameter) {
		this.model = parameter;
		this.initForm();
  }
	
  
  public newModel() {
		this.model = new Parameter();
		this.initForm();
  }
	
	

  private initForm() {
    
    this.editForm = new FormGroup({
    	'key':   new FormControl(this.model.key,      [Validators.required, ]),
    	'value':   new FormControl(this.model.value,      [Validators.required,  Validators.maxLength(255), ]),
    });
    
    this.isFormReady = true;
  }



  onSubmit() {
    if(this.editForm.valid) {
      let formValue = this.editForm.value;

      this.model.key = (formValue.key ? formValue.key: null);
      this.model.value = (formValue.value ? formValue.value: null);
      
                  
        this.adminService.saveParameter(this.model)
                .subscribe(
                      (data: any) => {
												this.alertService.info('Parameter Saved');
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


	onRemoveParam(parameterId: number) {
		this.userInputService.confirm(null, null).then(
				(result) => {
						this.adminService.deleteParameter(parameterId)
                .subscribe(
                      (data: any) => {
												this.alertService.info('Parameter removed');
												this.loadModels( 1 );
                      }
                    );
				}, 
				(reason) => {}
		);
	}


  get key() {
    return this.editForm.get('key');
  }
  
  get value() {
    return this.editForm.get('value');
  }
  


	
	searchKey = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>       term.length < 1 ? [] : this.keys.filter(v => v.label.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
	
	
	keyFormatter = (result) => result ? result.label : null;
	
	
	
	
	
}
