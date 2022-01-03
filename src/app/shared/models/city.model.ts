import { ICountry } from './country.model';

export interface ICity   {

	id?:  number;

	country?:  ICountry;

	labelEn?:  string;

	labelFr?:  string;

}



export class City implements ICity {
  constructor(public id?:  number,  public country?:  ICountry,  public labelEn?:  string,  public labelFr?:  string,  ) {}
}