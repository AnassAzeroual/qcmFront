import { Moment } from "moment";

export class QcmCriteria {

    libelle?: string;
    timeGlobal?:number;
    dateCreation?:Moment;
    constructor() {
        this.libelle = null;
        this.timeGlobal = null;
        this.dateCreation = null;
      }
}
