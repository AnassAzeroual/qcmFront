import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs-compat/Subject";
import { first, takeUntil } from "rxjs/operators";
import { CandidatService } from "../../Services/Candidat.service";
import { QCMService } from "../../Services/QCM.service";
import { correctValidator } from "../../helpers/resultatValidator";

@Component({
  selector: "app-ResultatQcm",
  templateUrl: "./ResultatQcm.component.html",
  styleUrls: ["./ResultatQcm.component.scss"],
})
export class ResultatQcmComponent implements OnInit {
  fg: FormGroup;
  private _unsubscribeAll$ = new Subject();
  base64 = "data:image/png;base64,";
  resultat: any;
  nom: string = "";
  note: any;
  isReady: boolean = false;
  // submited: boolean= false;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private qcmService: QCMService,
    private condidatService: CandidatService,
    private router: Router
  ) {
    this.fg = this.formBuilder.group({
      questions: this.formBuilder.array([this.initFormQuestion()]),
    });

    this.condidatService.changeCondidat$
      .pipe(first(), takeUntil(this._unsubscribeAll$))
      .subscribe((res) => {
        if (!res) return;

        this.nom = res.candidat.nom + " " + res.candidat.prenom;
        this.note = res.note;
        this.resultatQcm(res.idhash);
      });
  }

  ngOnInit() {}

  initFormQuestion() {
    return this.formBuilder.group({
      // numero: [null, []],
      textQuestion: [null, []],
      image: [null, []],
      time: [null, []],
      choix: this.formBuilder.array(
        [this.initFormChoixs()],
        correctValidator()
      ),
    });
  }

  initFormChoixs() {
    return this.formBuilder.group({
      numero: [null, []],
      correct: [null, []],
      choisi: [null, []],
      textReponse: [null, []],
    });
  }
  addFormQuestion(qt: any) {
    return this.formBuilder.group({
      numero: [qt.numero, []],
      textQuestion: [qt.textQuestion, []],
      image: [qt.image ? this.base64 + qt.image : "", []],
      time: [qt.time, []],
      choix: this.formBuilder.array(
        [this.initFormChoixs()],
        correctValidator()
      ),
    });
  }

  urltoFile(url, filename) {
    let file = null;

    if (url.split(",")[1] != "null") {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      file = new File([u8arr], filename, { type: mime });
    } else {
      file = null;
    }

    return file;
  }

  addFormChoixs(chx: any) {
    return this.formBuilder.group({
      numero: [chx.numero, []],
      correct: [chx.correct, []],
      choisi: [chx.choisi, []],
      textReponse: [chx.textReponse, []],
    });
  }

  removeChoix(indexQuestion: number, indexChoix: number) {
    (<FormArray>(
      (<FormArray>this.fg.controls["questions"]).at(indexQuestion).get("choix")
    )).removeAt(indexChoix);
  }

  resultatQcm(idhash: any) {
    this.qcmService.resultatQcm(idhash).subscribe((res) => {
      this.resultat = res;
      this.isReady = true;
      if (res) {
        let questionsArray: any = <FormArray>this.fg.controls["questions"];
        questionsArray.controls = []; // remove default questions form

        for (let j = 0; j < this.resultat.length; j++) {
          questionsArray.push(this.addFormQuestion(this.resultat[j]));

          const choixs = this.resultat[j]["reponses"]; // list choix of kendo grid list
          for (let i = 0; i < choixs.length; i++) {
            questionsArray
              .at(j)
              .get("choix")
              .push(this.addFormChoixs(choixs[i]));
          }

          this.removeChoix(j, 0);
        }
      }
    });
  }
}
