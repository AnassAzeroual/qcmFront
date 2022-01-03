import { Moment } from "moment";
import { Societe } from "./Societe";

export class Candidat {
    id: number;
    nom: string;
    prenom:string;
    mail:string;
    tel:string;
    ville:string;
    adresse:string;
    dateCreation:Moment;
    societe:Societe;



    constructor() {
        this.id = null;
        this.nom = null;
        this.prenom = null;
        this.mail = null;
        this.tel = null;
        this.ville = null;
        this.adresse = null;
        this.dateCreation = null;
        this.societe = null;
        
      }
}
