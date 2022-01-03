
import { IHabilitation } from './habilitation.model';

import { IRole } from './role.model';



export interface IRoleFonctionnel   {

  id?:  number;

  label?:  string;

  listOfRoles?:  IRole[];

  listOfHabilitations?:  IHabilitation[];

}



export class RoleFonctionnel implements IRoleFonctionnel {
  constructor(public id?:  number,  public label?:  string,  public listOfRoles?:  IRole[],  public listOfHabilitations?:  IHabilitation[],  ) {}
}

