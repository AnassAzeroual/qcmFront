import { LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Subject } from 'rxjs-compat/Subject';
import { first, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { QcmCandidat } from '../../Model/QcmCandidat';
import { QuestionQcmCandidat } from '../../Model/QuestionQcmCandidat';
import { ReponseQcmCandidat } from '../../Model/ReponseQcmCandidat';
import { QCMService } from '../../Services/QCM.service';

@Component({
  selector: "app-CommencerQcm",
  templateUrl: "./CommencerQcm.component.html",
  styleUrls: ["./CommencerQcm.component.scss"],
})
export class CommencerQcmComponent implements OnInit, OnDestroy {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public previousNumberQuestion: number = 0;
  public points: number = 0;
  counter = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  base64 = "data:image/png;base64,";
  private _unsubscribeAll$ = new Subject();
  id: string;
  interval$: any;
  questionQcmCandidat = new QuestionQcmCandidat();
  reponseQcmCandidat = new ReponseQcmCandidat();
  qcmCandidat = new QcmCandidat()
  tricher:boolean = false;
  constructor(private qcmService: QCMService,private alertService:AlertService,private location: LocationStrategy
    ) {
    this.qcmService.change$
      .pipe(first(), takeUntil(this._unsubscribeAll$))
      .subscribe((res) => {
        this.id = res;
      });

      history.pushState(null, null, window.location.href);
    this.location.onPopState(
      () => { history.pushState(null, null, window.location.href) }
    );

    document.addEventListener('visibilitychange', (event) => {
      if (document.hidden) 
        //  console.log('not visible');
        this.tricher= true
      // } else {
      //    console.log('is visible');
      // }
   });
  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.qcmService.commencerQcm(this.id).subscribe((res) => {
      this.questionList = res;
      this.recommencerQcm(this.id)
    //  this.startCounter(this.questionList[0].time);
    });
  }

  nextQuestion() {
    this.interval$.unsubscribe();

    if (this.questionList.length == this.currentQuestion + 1) {
      this.isQuizCompleted = true;
      this.envoiReponse(this.questionList[this.currentQuestion], true)
      return;
    }
    this.envoiReponse(this.questionList[this.currentQuestion])
    this.currentQuestion++;
    this.getProgressPercent();
    this.startCounter(this.questionList[this.currentQuestion].time);
  }
  previousQuestion() {
    this.currentQuestion--;
  }

 

  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }

  startCounter(time) {
    this.counter = time;
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if ( this.counter == 0 && this.questionList.length > this.currentQuestion + 1 ) {
        this.interval$.unsubscribe();
        this.envoiReponse(this.questionList[this.currentQuestion])
        this.currentQuestion++;
        this.getProgressPercent();

        this.startCounter(this.questionList[this.currentQuestion].time);
        this.counter = this.questionList[this.currentQuestion].time;
      } else if (
        this.counter === 0 &&
        this.questionList.length == this.currentQuestion + 1
      ) {
        this.interval$.unsubscribe();
        this.envoiReponse(this.questionList[this.currentQuestion],true)
        this.isQuizCompleted = true;
      }
    });
  }

  checkboxChanged(event: any, question: any, option: any){
    let objChoix = question.choix
    option.choisi = event.target.checked
  
    
    // objChoix.push()
  }

  checkValue(event: any, question: any, option: any) {
    for (const choix of this.questionList[this.currentQuestion].reponses) {
      if (option.id == choix.id) {
        choix.choisi = event.target.checked;
      }
    }
  }

  envoiReponse(reponseCandidat:any, forceCalculNote: boolean = false){
  
    this.qcmService.saveReponseCandidat(reponseCandidat).subscribe(res => 
      {
       
        if(forceCalculNote) {
          this.calculeNote(this.questionList[this.currentQuestion].qcmCandidat.id)
        }
      });

  }

  calculeNote(id:any){
  
    this.qcmService.calculeNote(id,this.tricher).subscribe(res => 
      {
       
        // this.points=res
        
      });

  }


    recommencerQcm(id){
      this.qcmService.reCommencerQcm(id).subscribe(res => {
        this.currentQuestion=res
        this.startCounter(this.questionList[this.currentQuestion].time);

      })
    }

  ngOnDestroy(): void {
    if(this.interval$)
    this.interval$.unsubscribe();
  }
}
