import { Candidat } from "./Candidat";
import { Qcm } from "./Qcm";

export class AffecteQcmCandidat {
    
    qcmDto:Qcm;
    candidatDto:Candidat;



    constructor() {
       
        this.qcmDto = null;
        this.candidatDto = null;
        
      }
}
