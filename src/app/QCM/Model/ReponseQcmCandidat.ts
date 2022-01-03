import { Moment } from "moment";
import { QuestionQcmCandidat } from "./QuestionQcmCandidat";

export class ReponseQcmCandidat {

    id: number;
    correct: string;
    dateReponse:Moment;
    // questionQcmCandidat:QuestionQcmCandidat;
    numero: number;
    choisi:boolean;
    textReponse:string;
    

    constructor() {
        this.id = null;
        this.correct = null;
        this.dateReponse = null;
        this.numero = null;
        this.choisi = false;
        this.textReponse = null;
        // this.questionQcmCandidat = null;
        
      }
}
