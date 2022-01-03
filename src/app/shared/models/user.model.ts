


export interface IUser   {

	idhash?:  string;

	firstname?:  string;

	lastname?:  string;

}



export class User implements IUser {
  constructor(public idhash?:  string,  public firstname?:  string,  public lastname?:  string,   ) {}
}
