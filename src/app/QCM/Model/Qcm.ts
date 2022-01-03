import { Moment } from "moment";
import { Question } from "./Question";

export class Qcm {


    id: number;
    libelle: string;
    timeGlobal:number;
    dateCreation:Moment;
    dateSuppression:Moment;
    questions: Question[];

    constructor() {
        this.id = null;
        this.libelle = null;
        this.timeGlobal = null;
        this.dateCreation = null;
        this.dateSuppression = null;
        this.questions=null;
      }
    
}
