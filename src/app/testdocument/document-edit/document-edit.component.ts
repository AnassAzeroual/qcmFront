import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import { DummyDocument } from '../models/DummyDocument';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DummyDocumentType } from '../models/DummyDocumentType';
import { DummyDocumentService } from '../services/dummy-document.service';

import * as commons from '../../shared';		// contains compareObjetFn
import * as moment from 'moment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDataResult, PageChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { DummyClient } from '../models/DummyClient';
import { BaseComponentCanDeactivate } from 'src/app/shared/base-candeactivate.component';

@Component({
    selector: 'app-document-edit',
    templateUrl: './document-edit.component.html',
    styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent extends BaseComponentCanDeactivate implements OnInit {

    // component's fields
    model: DummyDocument;
    editForm: FormGroup;
    isFormReady = false;
    submitted: boolean = null;

    listTypes: DummyDocumentType[] = [];
    listeTags: any[] = [];

    clientsResults = [];
    clientsView: GridDataResult;
    clientsPageSize = 10;
    clientsSkip = 0;
    selectedClient: DummyClient;

    compareFn = commons.compareObjetFn.bind(this);



    constructor(private dummyDocumentService: DummyDocumentService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private _location: Location,
        private modalService: NgbModal,) {
        super();
    }


    ngOnInit() {
        this.listTypes = this.dummyDocumentService.getListTypes();

        this.listeTags = [
            { 'value': 'Tag1', 'label': 'Tag1' },
            { 'value': 'Tag2', 'label': 'Tag2' },
            { 'value': 'Tag3', 'label': 'Tag3' },
            { 'value': 'Tag4', 'label': 'Tag4' },
        ];

        this.route.params
            .subscribe(
                (params: Params) => {
                    if (params['id']) {
                        this.loadModel(+params['id']);
                    } else {
                        this.model = new DummyDocument();
                        this.initForm();
                    }
                }
            );
    }


    private loadModel(id: number) {
        this.model = this.dummyDocumentService.getModelById(id);
        if (!this.model) {
            this.router.navigateByUrl('/document');
        } else {
            this.initForm();
        }
    }


    private initForm() {

        this.editForm = new FormGroup({
            'dateCreation': new FormControl(this.model.dateCreation, []),
            'statut': new FormControl(this.model.statut, [Validators.maxLength(1),]),
            'nom': new FormControl(this.model.nom, [Validators.required, Validators.maxLength(100),]),
            'type': new FormControl(this.model.type, []),
            'client': new FormControl(this.model.client, []),
            'tags': new FormControl(this.model.tags, []),
            'montant': new FormControl(this.model.montant, []),
            'quantite': new FormControl(this.model.quantite, []),
            'tel': new FormControl(this.model.tel, []),
            'flag': new FormControl(this.model.flag, [Validators.maxLength(1),]),
            'option1': new FormControl(this.model.option1, []),
            'option2': new FormControl(this.model.option2, []),

        });


        this.isFormReady = true;
    }


    onSubmit() {
        if (this.editForm.valid) {
            const formValue = this.editForm.value;

            this.model.dateCreation = formValue.dateCreation; //commons.momentFromNgDatepickerModel(formValue.dateCreation);

            this.model.statut = (formValue.statut ? formValue.statut : null);

            this.model.nom = (formValue.nom ? formValue.nom : null);

            this.model.type = formValue.type;

            this.model.client = formValue.client;

            this.model.tags = formValue.tags;

            this.model.montant = (formValue.montant != null ? +formValue.montant : null);

            this.model.quantite = (formValue.quantite != null ? +formValue.quantite : null);

            this.model.tel = (formValue.tel ? formValue.tel : null);

            this.model.flag = formValue.flag;

            this.model.option1 = formValue.option1;

            this.model.option2 = formValue.option2;


            this.dummyDocumentService.save(this.model);
            this.alertService.info('DummyDocument Successfuly Saved.');
            this.editForm.reset();
            // this._location.back();
            this.router.navigateByUrl('/document');

            this.submitted = false;
        } else {
            console.log('form not valid');
            this.submitted = true;
        }
    }


    onCancel() {
        // this._location.back();
        this.router.navigateByUrl('/document');
    }


    get editFormControls() {
        return this.editForm.controls;
    }


    openClientModal(content) {
        this.clientsResults = [];
        this.clientsView = null;
        this.selectedClient = null;

        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
            .result.then(
                result => {
                    console.log(result);
                },
                reason => {
                    console.log('Err!', reason);
                }
            );
    }


    SearchClient(criteria) {
        this.clientsResults = this.dummyDocumentService.searchClients(criteria);
        this.pageClientChange({ "skip": 0 });
    }


    public pageClientChange(event: PageChangeEvent | { "skip" }): void {
        this.clientsSkip = event.skip;

        this.clientsView = {
            data: this.clientsResults.slice(event.skip, event.skip + this.clientsPageSize),
            total: this.clientsResults.length
        };
    }

    selectClient(item: SelectionEvent) {
        if (item.selectedRows && item.selectedRows.length) {
            this.selectedClient = item.selectedRows[0].dataItem;
        }
    }

    chooseClient(clientModal: any) {
        this.editForm.patchValue({ 'client': this.selectedClient });
        this.editForm.controls.client.markAsDirty();
        this.editForm.controls.client.markAsTouched();
        clientModal.dismiss('Ok');
    }


    hasUnsavedData(): boolean {
        return (this.submitted == null || this.submitted) && this.editForm.dirty;
    }
}

