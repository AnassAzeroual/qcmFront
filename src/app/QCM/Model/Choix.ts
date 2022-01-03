import { Question } from "./Question";

export class Choix {
    id: number;
    numero: number;
    correct:string;
    textReponse:string;
    question:Question;

    constructor() {
        this.id = null;
        this.numero = null;
        this.correct = null;
        this.textReponse = null;
        this.question = null;
      }
}
