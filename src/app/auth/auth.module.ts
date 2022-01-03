import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthRoutingModule } from './auth-routing.module';
import { WidgetModule } from 'src/app/partage/widget/widget.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmPasswordComponent,
    PasswordResetComponent,
    LogoutComponent,
    LockScreenComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    WidgetModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
