

export interface IHabilitation   {

	id?:  number;

	label?:  string;

}



export class Habilitation implements IHabilitation {
  constructor(public id?:  number,  public label?:  string,  ) {}
}


