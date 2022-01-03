
export interface IParameterGroup   {

	id?:  number;

	label?:  string;

}



export class ParameterGroup implements IParameterGroup {
  constructor(public id?:  number,  public key?:  string,  public label?:  string,  ) {}
}


