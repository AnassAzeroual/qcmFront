import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs-compat/Subject";
import { Subscription } from "rxjs-compat/Subscription";
import { first, sample, takeUntil } from "rxjs/operators";
import { atLeastOneCheckboxCheckedValidator } from "../../helpers/atLeastOneCheckboxCheckedValidator";
import { Qcm } from "../../Model/Qcm";
import { QCMService } from "../../Services/QCM.service";
import { QuestionComponent } from "../Question/Question/Question.component";

@Component({
  selector: "app-GestionQcm",
  templateUrl: "./GestionQcm.component.html",
  styleUrls: ["./GestionQcm.component.scss"],
})
export class GestionQcmComponent implements OnInit {
  fg: FormGroup;
  ch: FormGroup;
  private _unsubscribeAll$ = new Subject();

  private getChoixsSubscription: Subscription;
  qcm = new Qcm();
  colorselect: string = "";
  selectedQuestionID: number;
  base64 = "data:image/png;base64,";
  sum = 0;
  submited: boolean= false;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private qcmService: QCMService,
    private router: Router
  ) {


    this.fg = this.formBuilder.group({
      id: [null, []],
      libelle: [null, []],
      timeGlobal: [null, []],
      questions: this.formBuilder.array([this.initFormQuestion()]),
    });




    this.qcmService.change$
      .pipe(first(), takeUntil(this._unsubscribeAll$))
      .subscribe((res) => {

        if (!res) return;
        this.fg.patchValue({
          id: res.id,
          libelle: res.libelle,
          timeGlobal: res.timeGlobal,
        });

        let questionsArray: any = <FormArray>this.fg.controls["questions"];
        questionsArray.controls = []; // remove default questions form

        
        

        for (let j = 0; j < res["questions"].length; j++) {
          questionsArray.push(this.addFormQuestion(res["questions"][j]));

          const choixs = res["questions"][j]["choix"]; // list choix of kendo grid list
          for (let i = 0; i < choixs.length; i++) {
            questionsArray
              .at(j)
              .get("choix")
              .push(this.addFormChoixs(choixs[i]));
          }
          this.removeChoix(j, 0);
        }
      });

      this.fg.valueChanges.subscribe(res=>{
        this.timeGlobal(); // update input timeGlobal value
      })
  }

  ngOnInit() {
    this.timeGlobal(); // update input timeGlobal value
  }

  initForm() {
    return this.formBuilder.group({
      id: [null, []],
      libelle: [null, []],
      timeGlobal: [null, []],
      questions: this.formBuilder.array([this.initFormQuestion()]),
    });
  }

  initFormQuestion() {
    return this.formBuilder.group({
      numero: [null, []],
      textQuestion: [null, []],
      image: [null, []],
      imageFile: [null, []],
      time: [null, []],
      choix: this.formBuilder.array([this.initFormChoixs()],atLeastOneCheckboxCheckedValidator()),
    });
  }

  addFormQuestion(qt: any) {

    
    let file = this.urltoFile(this.base64 + qt.image, "image.PNG");

    return this.formBuilder.group({
      numero: [qt.numero, []],
      textQuestion: [qt.textQuestion, []],
      image: [qt.image ? this.base64 + qt.image : "", []],
      imageFile: [file, []],
      time: [qt.time, []],
      choix: this.formBuilder.array([this.initFormChoixs()],atLeastOneCheckboxCheckedValidator()),
    });
  }

  initFormChoixs() {
    return this.formBuilder.group({
      numero: [null, []],
      correct: [null, []],
      textReponse: [null, []],
    });
  }

  addFormChoixs(chx: any) {
    return this.formBuilder.group({
      numero: [chx.numero, []],
      correct: [chx.correct, []],
      textReponse: [chx.textReponse, []],
    });
  }

  clearImage() {
    (<HTMLInputElement>(
      document.getElementById("uploadCaptureInputFile")
    )).value = "";
  }


  editQuestion(i: number) {
    this.openQuestionManipulation(i);
  }

  openQuestionManipulation(i?: number) {
    const questionModalRef = this.modalService.open(QuestionComponent, {
      ariaLabelledBy: "modal-basic-title",
      size: "xl",
    });

    questionModalRef.result.then(
      (generatedQuestion) => {
        if (generatedQuestion) {
          this.getChoixs(generatedQuestion.id);

          this.fg.controls.questions.markAsTouched();
          this.fg.controls.questions.markAsDirty();
          if (i === undefined || i === null) {
            this.fg.patchValue({
              questions: [...this.fg.value.questions, generatedQuestion],
            });
          } else {
            const newQuestions = this.fg.value.questions.map(
              (question, index) => {
                if (i !== index) {
                  return question;
                } else {
                  return generatedQuestion;
                }
              }
            );
            this.fg.patchValue({ questions: newQuestions });
          }
        }
      },
      (reason) => {}
    );
    // operationModalRef.componentInstance.currentClientID = this.fg.value.client?.id;
    if (i !== undefined && i !== null) {
      questionModalRef.componentInstance.question = this.fg.value.questions[i];
    }
  }

  getChoixs(questionId: number) {
    this.getChoixsSubscription = this.qcmService
      .getChoixsQuestion(questionId)
      .subscribe((choix) => {
        this.fg.patchValue({ question: { ...this.fg.value.questions, choix } });
      });
  }

  getLines(text: string) {
    return text?.split("\n");
  }

  saveQcm() {

    this.submited=true
    if(this.fg.invalid)
    return 
    let images: any = [];

    for (let i = 0; i < this.fg["controls"].questions["controls"].length; i++) {
      this.fg["controls"].questions["controls"].at(i).patchValue({
        numero: i + 1,
      });

      if (
        this.fg["controls"].questions["controls"].at(i).get("image") == null
      ) {
        images.push(null);
      } else {
        images.push(
          this.fg["controls"].questions["controls"].at(i).get("imageFile").value
        );
      }
      this.fg["controls"].questions["controls"].at(i).patchValue({
        image: null,
      });
     
      for (
        let j = 0;
        j < this.fg["controls"].questions["controls"].at(i).get("choix").length;
        j++
      ) {
        this.fg["controls"].questions["controls"]
          .at(i)
          .get("choix")
          .at(j)
          .patchValue({
            numero: j + 1,
          });
      }
    }


    let uploadImageData = new FormData();
    const qcmBlob = new Blob([JSON.stringify(this.fg.value) as BlobPart], {
      type: "application/json",
    });

    let index = 0;
    let listImagesIndexesNull = [];

    for (const image of images) {
      if (image) {
        uploadImageData.append("files", image);
      } else {
        listImagesIndexesNull.push(index);
      }

      index++;
    }

    const listNullIndexesBlob = new Blob(
      [JSON.stringify(listImagesIndexesNull) as BlobPart],
      {
        type: "application/json",
      }
    );
    uploadImageData.append("nullIndexes", listNullIndexesBlob);
    uploadImageData.append("qcm", qcmBlob);
    this.qcmService.creerQcm(uploadImageData).subscribe((res) => {
      this.qcm = res;
      this.router.navigate(["/qcm/list-qcm"]);
    });
  }

  addQuestion() {
    const control = <FormArray>this.fg.controls["questions"];
    control.push(this.initFormQuestion());
  }

  addChoix(questionId) {

    const control = (<FormArray>this.fg.controls["questions"])
      .at(questionId)
      .get("choix") as FormArray;
    control.push(this.initFormChoixs());
  }

  removeChoix(indexQuestion: number, indexChoix: number) {
    (<FormArray>(
      (<FormArray>this.fg.controls["questions"]).at(indexQuestion).get("choix")
    )).removeAt(indexChoix);
  }

  removeQuestion(index: number) {
    let time = (<FormArray>this.fg.controls["questions"])
      .at(index)
      .get("time").value;
    this.subTimeFromTimeGlobal(time);
    (<FormArray>this.fg.controls["questions"]).removeAt(index);
  }

  // uploid images
  onFileChange(event, i) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        
        (<FormArray>this.fg.controls["questions"]).at(i).patchValue({
          image: reader.result,
        });

        (<FormArray>this.fg.controls["questions"]).at(i).patchValue({
          imageFile: event.target.files[0],
        });
      };
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }

  openModalFiltrer(content, i) {
    this.selectedQuestionID = i;

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

  modalFormChoixs(id) {
    return this.fg["controls"].questions["controls"][id];
  }

  submit() {}

  setQuestionNumber(i: number) {
    this.fg["controls"].questions["controls"]
      .at(i)
      .get("numero")
      .setValue(i + 1);
  }

  urltoFile(url, filename) {
    let file = null;
    
    if (url.split(',')[1] != 'null') {
      var arr = url.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), 
              n = bstr.length, 
              u8arr = new Uint8Array(n);
              
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          file  = new File([u8arr], filename, {type:mime});
    } else {
      file = null
    }
        
        return file
    
  }

  timeGlobal() {
    this.sum = 0;

    for (const q of this.fg.controls["questions"].value) {
      this.sum += Number(q.time);

    }
    this.fg.get('timeGlobal').setValue(this.sum, { emitEvent: false })
  }

  subTimeFromTimeGlobal(value){
    this.fg.patchValue({
      timeGlobal: this.fg.get('timeGlobal').value - Number(value)
     })
  }
  
}
