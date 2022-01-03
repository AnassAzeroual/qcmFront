
import { IHabilitation } from './habilitation.model';



export interface IRole   {

	id?:  number;

	label?:  string;

	listOfHabilitations?: IHabilitation[]; 

}



export class Role implements IRole {
  constructor(public id?:  number,  public label?:  string,  public listOfHabilitations?:  IHabilitation[],  ) {}
}


