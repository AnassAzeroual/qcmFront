import { AuthService } from './../../shared/services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signUpForm!: FormGroup;
  formSubmitted: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() {
    return this.signUpForm.controls;
  }


  /**
   * On form submit
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.signUpForm.valid) {
      this.loading = true;
      // this.authenticationService.signup(this.formValues.name?.value, this.formValues.email?.value, this.formValues.password?.value)
      //   .pipe(first())
      //   .subscribe(
      //     (data: any) => {
      //       // navigates to confirm mail screen
      //       this.router.navigate(['/account/confirm']);
      //     },
      //     (error: any) => {
      //       this.error = error;
      //       this.loading = false;
      //     });
    }
  }

}
