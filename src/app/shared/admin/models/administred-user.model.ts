import { ICity } from '../../models/city.model';
import { IRole } from './role.model';
import { IHabilitation } from './habilitation.model';
import { IRoleFonctionnel } from './role-fonctionnel.model';


export interface IAdministredUser   {

	idhash?:  string;

	firstname?:  string;

	lastname?:  string;

	email?:  string;

	username?:  string;

	oldPassword?:  string;

	newPassword?:  string;

	logo?:  string;

	city?:  ICity;

	enabled?: boolean;
	
	disabledCause?: string;
	
	emailVerified?: string;

	role?: IRole;
	
	roles?: IRole[];
	
	rolesFonctionnels?: IRoleFonctionnel[];


	listOfHabilitations?: IHabilitation[]; 
	
	listOfInterdictions?: IHabilitation[]; 

}



export class AdministredUser implements IAdministredUser {
  constructor(public idhash?:  string,  public firstname?:  string,  public lastname?:  string,  public email?:  string,  public username?:  string,  public oldPassword?:  string,  public newPassword?:  string,  public logo?:  string,  public city?:  ICity,     public enabled?:  boolean,    public disabledCause?:  string,    public emailVerified?:  string,    public role?:  IRole,    public listOfHabilitations?:  IHabilitation[],    public listOfInterdictions?:  IHabilitation[]) {}
}

