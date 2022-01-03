import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { ParametersComponent } from './parameters/parameters.component';

import { SharedModule } from '../shared.module';
import { UsersComponent } from './users/users.component';
import { ViewsHabilitationsComponent } from './views-habilitations/views-habilitations.component';
import { ElementViewsComponent } from './views-habilitations/element-views/element-views.component';

@NgModule({
  declarations: [ParametersComponent, UsersComponent, ViewsHabilitationsComponent, ElementViewsComponent],
  imports: [
    ReactiveFormsModule, 
		FormsModule,
    CommonModule,
		NgbDropdownModule,
		NgbPaginationModule,
		NgbTypeaheadModule,
    NgbModalModule,
		
		//SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
