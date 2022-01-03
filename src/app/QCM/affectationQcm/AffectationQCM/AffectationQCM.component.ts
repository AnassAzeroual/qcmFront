import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subject } from 'rxjs-compat/Subject';
import { first, takeUntil } from 'rxjs/operators';
import { AffecteQcmCandidat } from '../../Model/AffecteQcmCandidat';
import { Candidat } from '../../Model/Candidat';
import { QcmCriteria } from '../../Model/Criteria/QcmCriteria';
import { CandidatService } from '../../Services/Candidat.service';
import { QCMService } from '../../Services/QCM.service';

@Component({
  selector: 'app-AffectationQCM',
  templateUrl: './AffectationQCM.component.html',
  styleUrls: ['./AffectationQCM.component.scss']
})
export class AffectationQCMComponent implements OnInit {
  private _unsubscribeAll$ = new Subject();
  candidat = new Candidat();
  fg: FormGroup;
  searchObject = new  QcmCriteria() ;
  skip = 0;
  page = 0;
  pageSize = 10;
  creancesGrid: any;
  affecteQcmCandidat= new AffecteQcmCandidat();


  constructor(private modalService: NgbModal,private qcmService:QCMService,private formBuilder: FormBuilder,private candidatService: CandidatService, private router: Router) {

    this.candidatService.change$
    .pipe(
      first(),
      takeUntil(this._unsubscribeAll$)
    )
    .subscribe(res => {
      this.candidat=res
// console.log(this.candidat);

    })

   }

  ngOnInit() {
    this.initForm();
    this.getQcmData();
  }

  initForm() {
    this.fg = this.formBuilder.group({
        libelle: [null, []],
        timeGlobal: [null, []]
    });
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
  selectedRow(e)
  {
    console.log("selected row :: ",e);
  }

  pageChange(event: PageChangeEvent): void {
    this.page = Math.floor(event.skip / this.pageSize);
    this.getQcmData();
    this.skip = event.skip;
  }

  affecter(qcm){
    // console.log(qcm);
    // console.log(this.candidat);
    this.affecteQcmCandidat.candidatDto=this.candidat
    this.affecteQcmCandidat.qcmDto=qcm;
    this.qcmService.affecter(this.affecteQcmCandidat).subscribe(res=>{
      this.router.navigate(['/qcm/qcm-candidat'])
    })
    
  }

}
