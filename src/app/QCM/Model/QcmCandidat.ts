import { Candidat } from "./Candidat";
import { Qcm } from "./Qcm";
import { Moment } from "moment";

export class QcmCandidat {
    
    id: number;
    idhash: number;
    dateCreation:Moment;
    dateEnvoiMail:Moment;
    dateDebut:Moment;
    dateFin:Moment;
    statut:string;
    candidat:Candidat;
    qcm:Qcm;
    tricher:Boolean; 


    constructor() {
        this.id = null;
        this.idhash = null;
        this.dateCreation = null;
        this.dateEnvoiMail = null;
        this.dateDebut = null;
        this.dateFin = null;
        this.statut = null;
        this.candidat = null;
        this.tricher = false;
        this.qcm = null;

      }
}
