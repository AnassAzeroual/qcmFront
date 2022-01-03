import { Societe } from "../Societe";

export class CandidatCriteria {

    nom?: string;
    prenom?:string;
    mail?:string;
    tel?:string;
    ville?:string;
    societe?:Societe;



    constructor() {
        this.nom = null;
        this.prenom = null;
        this.mail = null;
        this.tel = null;
        this.ville = null;
        this.societe = null;
        
      }
}
