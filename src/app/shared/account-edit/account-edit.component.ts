import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { StaticDataService } from '../services/static-data.service';
import { AlertService } from '../services/alert.service';
import { IUserAccount, UserAccount } from '../models/user-account.model';
import { ICity } from '../models/city.model';
import { ICountry } from '../models/country.model';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  model : IUserAccount;
  editForm: FormGroup;
  isFormReady = false;
  submitted : boolean = false;
	
  isSignup : boolean = false;
	
	
  countries: ICountry[] = [ ];
	selectedCountry: ICountry;
	
  cities: ICity[] = [ ];


  constructor(private authService: AuthService, 
								private staticDataService: StaticDataService,
								private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location, ) { }
								
								
								

  ngOnInit() {
		
		this.loadCountries();
		
		this.route.data.subscribe(
				(data) => {
					if(data.create === false) {
						this.isSignup = false;
						this.loadModel();
					}
					else {
						this.isSignup = true;
						this.model = new UserAccount();
            this.initForm();
					}
				}
		);
		
  }
	
	
	private loadCountries() {
		this.staticDataService.getListCountries( )
                .subscribe(
                      (data: any) => {
                        this.countries = data;
                      }
                    );
	}
	
	
	private loadCities(countryId: number) {
		this.staticDataService.getListCitiesByCountryId( countryId )
                .subscribe(
                      (data: any) => {
                        this.cities = data;
                      }
                    );
	}



	private loadModel() {
  	this.authService.getMyAccount( )
                .subscribe(
                      (data: any) => {
                        this.model = data;
												
												this.selectedCountry = this.model && this.model.city ? this.model.city.country  : null;
												
												if(this.selectedCountry)
													this.loadCities(this.selectedCountry.id);
												
                        this.initForm();
                      }
                    );
	}
	
	
	
	private initForm() {
    
    this.editForm = new FormGroup({
    	'firstname':   new FormControl(this.model.firstname,      [ Validators.maxLength(40), ]),
    	'lastname':   new FormControl(this.model.lastname,      [ Validators.maxLength(40), ]),
      'city': new FormControl(this.model.city, []),
      'country': new FormControl(this.selectedCountry, []),
    	'email':   new FormControl(this.model.email,      [Validators.required,  Validators.email,  Validators.maxLength(60), ]),
    	'username':   new FormControl(this.model.username,      [Validators.required,  Validators.maxLength(60), ]),
			'passwordGroupData': new FormGroup({
						'oldPassword':   new FormControl(null,      [ ]),
						'newPassword':   new FormControl(null,      [ ]),
						'confirmPass': new FormControl('', [])
						}, [this.checkPasswords.bind(this)]),
    	
    	'logo':   new FormControl(this.model.logo,      [ ]),
    });
    
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
      this.model.oldPassword = (formValue.passwordGroupData.oldPassword ? formValue.passwordGroupData.oldPassword: null);
      this.model.newPassword = (formValue.passwordGroupData.newPassword ? formValue.passwordGroupData.newPassword: null);
      this.model.logo = (formValue.logo ? formValue.logo: null);
      
                  
        this.authService.saveAccount(this.model)
                .subscribe(
                      (data: any) => {
													this.alertService.info("Account Saved");
													this.editForm.reset();
													this.router.navigate(['/']);
                      		//this._location.back();
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
    this._location.back();
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
  
  get oldPassword() {
    return this.editForm.get('passwordGroupData.oldPassword');
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
  
  


  
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
	  let oldPass = group.controls.oldPassword.value;
	  let newPass = group.controls.newPassword.value;
	  let confirmPass = group.controls.confirmPass.value;

		if(!newPass) {
			if(this.isSignup===false)
				return null;
			else
				return { noNewPass: true };
		}
		else if(!oldPass  &&  this.isSignup===false)
			return { noOldPass: true };
		else if( newPass !== confirmPass  )
			return { notSame: true };   
		else
			return null;
  }



	
	searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>       term.length < 1 ? [] : this.cities.filter(v => v.labelEn.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
	
	
	cityFormatter = (result) => result ? result.labelEn : null;
	
	
	
	
	
	



	
	searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>       term.length < 1 ? [] : this.countries.filter(v => v.labelEn.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
	
	
	countryFormatter = (result) => result ? result.labelEn : null;
	
	
	
	
	chooseCountry(event) {
		if(this.selectedCountry && event.item.id !== this.selectedCountry.id)
			this.city.setValue(null);
		
		this.selectedCountry = event.item;
		
		if(this.selectedCountry)
			this.loadCities(this.selectedCountry.id);
	}
}
