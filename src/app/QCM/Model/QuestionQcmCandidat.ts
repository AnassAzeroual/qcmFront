import { Moment } from "moment";
import { QcmCandidat } from "./QcmCandidat";
import { Question } from "./Question";
import { ReponseQcmCandidat } from "./ReponseQcmCandidat";

export class QuestionQcmCandidat {

    id: number;
    dateRecois: Moment;
    qcmCandidat:QcmCandidat;
    numero:number;
    textQuestion:string;
    image?:any;
    time:number;
    reponses: ReponseQcmCandidat[];
    // question:Question;
   
    

    constructor() {
        this.id = null;
        this.dateRecois = null;
        this.qcmCandidat = null;
        this.numero = null;
        this.textQuestion = null;
        this.image = null;
        this.time = null;
        this.reponses = [];
        // this.question= null;
        
      }
}
