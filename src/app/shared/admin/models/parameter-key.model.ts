

import { IParameterGroup } from './parameter-group.model';


export interface IParameterKey   {

	id?:  number;

	label?:  string;

	group?:  IParameterGroup;

}



export class ParameterKey implements IParameterKey {
  constructor(public id?:  number,  public label?:  string,  public group?:  IParameterGroup,  ) {}
}


