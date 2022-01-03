import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Candidat } from '../../Model/Candidat';
import { CandidatCriteria } from '../../Model/Criteria/CandidatCriteria';
import { Societe } from '../../Model/Societe';
import { CandidatService } from './../../Services/Candidat.service';

@Component({
  selector: 'app-ListCandidat',
  templateUrl: './ListCandidat.component.html',
  styleUrls: ['./ListCandidat.component.scss']
})
export class ListCandidatComponent implements OnInit {
  searchObject = new  CandidatCriteria() ;
  creancesGrid: any;
  skip = 0;
  page = 0;
  pageSize = 10;
  fg: FormGroup;
  societes: Societe[];

  

  constructor(private formBuilder: FormBuilder,private candidatService: CandidatService  , private modalService: NgbModal,
    private router:Router
    ) { }

  ngOnInit() {
    this.initForm();
    this.getCandidatData();
    this.getData();

  }

  getData() {
    this.candidatService.listSociete().subscribe(data => {
            this.societes = data;
        }
    );
  }
  

getCandidatData() {
  this.candidatService.listCandidatCriteria(this.searchObject, this.page, this.pageSize).subscribe(data => {
    this.creancesGrid = {
        data:data.content,
        total:data.totalElements
      };
  });
}

addCandidat(candidatRow:Candidat){


  this.candidatService.changeValue(candidatRow);
  this.router.navigate(['/qcm/gestion-candidat'])

  
}
selectedRow(row:any){}

pageChange(event: PageChangeEvent): void {
  this.page = Math.floor(event.skip / this.pageSize);
  this.getCandidatData();
  this.skip = event.skip;
}

gotoCandidat(){
  this.router.navigate(['/qcm/gestion-candidat'])
 
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


//
submit() {
  console.log(this.fg.value)
  this.candidatService.listCandidatCriteria(this.fg.value,this.page, this.pageSize).subscribe(data => {
    this.modalService.dismissAll();
    this.creancesGrid = {
      data:data.content,
      total:data.totalElements
    };
});
    
}

initForm() {
  this.fg = this.formBuilder.group({
      nom: [null, []],
      prenom: [null, []],
      mail: [null, []],
      tel: [null, []],
      ville: [null, []],
      adresse: [null, []],
      societe: [null, []]
      
  });
}


formatter = (result: any) => result.nom;
  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((query) => query && query.length >= 3),
      map(term => term.length < 2 ? []
        : this.societes.filter(v => v.nom.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    selectedSociete(s){
    // console.log(s.item);

    }


    affecteQcm(candidatRow:any){
      this.candidatService.changeValue(candidatRow);
      this.router.navigate(['/qcm/affectation-qcm'])
    }
    envoiMail(candidatRow:any){
    this.candidatService.sendMail(candidatRow).subscribe()
    }
}
