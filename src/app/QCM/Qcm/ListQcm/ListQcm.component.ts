import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { OperatorFunction } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { QcmCriteria } from '../../Model/Criteria/QcmCriteria';
import { Qcm } from '../../Model/Qcm';
import { QCMService } from './../../Services/QCM.service';

@Component({
  selector: 'app-ListQcm',
  templateUrl: './ListQcm.component.html',
  styleUrls: ['./ListQcm.component.scss']
})
export class ListQcmComponent implements OnInit {

  searchObject = new  QcmCriteria() ;
  creancesGrid: any;
  skip = 0;
  page = 0;
  pageSize = 10;
  fg: FormGroup;

  constructor(private qcmService:QCMService, private modalService: NgbModal,private formBuilder: FormBuilder
    ,private router:Router) { }

  ngOnInit() {
    this.initForm();
    this.getQcmData();

  }

  

  addQcm(row:any){}

  submit() {
    // console.log(this.fg.value)
    this.qcmService.listQcm(this.fg.value,this.page, this.pageSize).subscribe(data => {
      this.modalService.dismissAll();
      this.creancesGrid = {
        data:data.content,
        total:data.totalElements
      };
  });
      
  }

  initForm() {
    this.fg = this.formBuilder.group({
        libelle: [null, []],
        timeGlobal: [null, []]
    });
  }

  selectedRow(row:any){}

pageChange(event: PageChangeEvent): void {
  this.page = Math.floor(event.skip / this.pageSize);
  this.getQcmData();
  this.skip = event.skip;
}

openModalFiltrer(content) {
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

gotoQcm(){
  this.qcmService.changeValue(null);
  this.router.navigate(['/qcm/gestion-qcm'])
 
}

getQcmData() {
  this.qcmService.listQcm(this.searchObject, this.page, this.pageSize).subscribe(data => {
    // console.log(data);
    
    this.creancesGrid = {
        data:data.content,
        total:data.totalElements
      };
  });
}

updateQcm(qcmRow:Qcm){


  this.qcmService.changeValue(qcmRow);
  this.router.navigate(['/qcm/gestion-qcm'])

  
}


}
