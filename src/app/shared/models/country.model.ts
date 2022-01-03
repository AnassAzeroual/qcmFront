

export interface ICountry   {

	id?:  number;

	labelEn?:  string;

	labelFr?:  string;

}



export class Country implements ICountry {
  constructor(public id?:  number,  public labelEn?:  string,  public labelFr?:  string,  ) {}
}
