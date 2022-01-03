import { Choix } from "./Choix";
import { Qcm } from "./Qcm";

export class Question {

    id: number;
    // libelle: string;
    numero:number;
    textQuestion:string;
    image?:any;
    time:number;
    qcm:Qcm;
    choix: Choix[];

    

    constructor() {
        this.id = null;
        // this.libelle = null;
        this.numero = null;
        this.textQuestion = null;
        this.image = null;
        this.time = null;
        this.qcm = null;
      }
}
