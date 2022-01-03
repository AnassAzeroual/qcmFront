import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Candidat } from '../../Model/Candidat';
import { CandidatCriteria } from '../../Model/Criteria/CandidatCriteria';
import { Qcm } from '../../Model/Qcm';
import { CandidatService } from '../../Services/Candidat.service';

@Component({
  selector: "app-QcmCandidat",
  templateUrl: "./QcmCandidat.component.html",
  styleUrls: ["./QcmCandidat.component.scss"],
})
export class QcmCandidatComponent implements OnInit {
  creancesGrid: any;
  skip = 0;
  page = 0;
  pageSize = 10;
  fg: FormGroup;
  searchObject = new CandidatCriteria();
  qcms: Qcm[];
  candidats: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
    private modalService: NgbModal,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getQcmCandidatData();
    this.getListQcm();
    // this.geListtCandidat();
    this.lisCandidat()
  }

  selectedRow(row: any) {}

  pageChange(event: PageChangeEvent): void {
    this.page = Math.floor(event.skip / this.pageSize);
    this.getQcmCandidatData();
    this.skip = event.skip;
  }
  getQcmCandidatData() {
    this.candidatService
      .allQcmCandidat(this.page, this.pageSize)
      .subscribe((data) => {
        this.creancesGrid = {
          data: data.content,
          total: data.totalElements,
        };
      });
  }
  envoiMail(candidatRow: any) {
    this.candidatService.sendMail(candidatRow).subscribe((res) => {
      if (res) {
        this.alertService.info("bien envoyé");
      } else {
        this.alertService.warning("Mail Non Envoyé");
      }
    });
  }

  showResultatQcm(qcmCandidat: any) {
    this.candidatService.changeValueCondidat(qcmCandidat);
    this.router.navigate(["/qcm/resultat-qcm"]);
  }

  openModalFiltrer(content) {
    this.initForm();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log("Err!", reason);
        }
      );
  }

  submit() {
    if(this.fg.value.qcm == "")
    this.fg.value.qcm=null;

    
    if(this.fg.value.candidat == "")
    this.fg.value.candidat=null;

    console.log(this.fg.value);
    this.candidatService
      .listQcmCandidatCriteria(this.fg.value, this.page, this.pageSize)
      .subscribe((data) => {
        this.modalService.dismissAll();
        this.creancesGrid = {
          data: data.content,
          total: data.totalElements,
        };
      });
  }

  formatter = (result: any) => result.libelle;
  search: OperatorFunction<string, readonly any[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((query) => query && query.length >= 3),
      map((term) =>
        term.length < 2
          ? []
          : this.qcms
              .filter(
                (v) => v.libelle.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatterCandidat = (result: any) => result.nom;
  searchcandidat: OperatorFunction<string, readonly any[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((query) => query && query.length >= 3),
      map((term) =>
        term.length < 2
          ? []
          : this.candidats
              .filter(
                (v) => v.nom.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  getListQcm() {
    this.candidatService.listQcm().subscribe((data) => {
      this.qcms = data;
    });
  }
  geListtCandidat() {
    this.candidatService.listCandidat().subscribe((data) => {
      this.candidats = data;
    });
  }

  selectedQcm(s) {
    // console.log(s.item);
  }
  selectedCandidat(s) {
    // console.log(s.item);
  }

  initForm() {
    this.fg = this.formBuilder.group({
      qcm: [null, []],
      candidat: [null, []],
    });
  }

  lisCandidat() {
    this.candidatService.listCandidat().subscribe(res =>{
      for (const iterator of res) {
        this.candidats.push(iterator.candidat)
      }
    });
  }
}
