import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Select2Module } from 'ng-select2-component';
import { NgxMaskModule } from 'ngx-mask';
import { GridModule } from '@progress/kendo-angular-grid';

import { TestdocumentRoutingModule } from './testdocument-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';


@NgModule({
  declarations: [DocumentListComponent, DocumentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule,
    Select2Module,
    NgbModalModule,
    NgbDatepickerModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    GridModule,
    NgbDropdownModule,
    TestdocumentRoutingModule
  ]
})
export class TestdocumentModule { }
