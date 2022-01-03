
import { IParameterKey } from './parameter-key.model';


export interface IParameter   {

	id?:  number;

	key?:  IParameterKey;

	value?:  string;

}



export class Parameter implements IParameter {
  constructor(public id?:  number,  public key?:  IParameterKey,  public value?:  string,  ) {}
}


