import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OperatorFunction, Subject } from 'rxjs';
import { Observable } from 'rxjs-compat/Observable';
import { debounceTime, distinctUntilChanged, filter, first, map, switchMap, takeUntil } from 'rxjs/operators';
import { Candidat } from '../../Model/Candidat';
import { CandidatCriteria } from '../../Model/Criteria/CandidatCriteria';
import { Societe } from '../../Model/Societe';
import { CandidatService } from './../../Services/Candidat.service';

@Component({
  selector: 'app-GestionCandidat',
  templateUrl: './GestionCandidat.component.html',
  styleUrls: ['./GestionCandidat.component.scss']
})
export class GestionCandidatComponent implements OnInit {
  fg: FormGroup;
  societes: Societe[];
  candidat = new Candidat();
  private _unsubscribeAll$ = new Subject();

  constructor(private formBuilder: FormBuilder, private candidatService: CandidatService, private router: Router) {
    this.initForm();
    this.candidatService.change$
      .pipe(
        first(),
        takeUntil(this._unsubscribeAll$)
      )
      .subscribe(res => {
        this.fg.patchValue({
          id:res.id,
          nom: res.nom,
          prenom: res.prenom,
          mail: res.mail,
          tel: res.tel,
          ville: res.ville,
          adresse: res.adresse,
          societe: res.societe,
        })

      })
  }

  ngOnInit() {
    this.getData();


  }


  initForm() {
    this.fg = this.formBuilder.group({
      id: [null, []],
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      mail: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      ville: [null, [Validators.required]],
      adresse: [null, []],
      societe: [null, [Validators.required]]

    });
  }

  getData() {
    this.candidatService.listSociete().subscribe(data => {
      this.societes = data;
    }
    );
  }

  saveCandidat() {
    this.candidatService.creerCandidat({ ...this.fg.value })
      .subscribe(res => {
        this.candidat = res;
        this.candidatService.changeValue(null);
        this.router.navigate(['/qcm/list-candidat'])

        
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

  selectedSociete(s) {
    // console.log(s.item);

  }

}
