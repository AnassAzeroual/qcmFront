import { ICity } from './city.model';


export interface IUserAccount   {

	idhash?:  string;

	firstname?:  string;

	lastname?:  string;

	email?:  string;

	username?:  string;

	oldPassword?:  string;

	newPassword?:  string;

	logo?:  string;

	city?:  ICity;

	gsm?:  string;


}



export class UserAccount implements IUserAccount {
  constructor(public idhash?:  string,  public firstname?:  string,  public lastname?:  string,  public email?:  string,  public username?:  string,  public oldPassword?:  string,  public newPassword?:  string,  public logo?:  string,  public city?:  ICity, public gsm?:  string ) {}
}

