import { Moment } from "moment";
import { Candidat } from "../Candidat";
import { Qcm } from "../Qcm";

export class QcmCandidatCriteria {

  candidat?:Candidat;
  qcm?:Qcm;
    constructor() {
        this.candidat = null;
        this.qcm = null;
      }
}
