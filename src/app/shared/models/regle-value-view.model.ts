import { Habilitation } from '../admin/models/habilitation.model';
import { Role } from '../admin/models/role.model';
import { UiViewElement } from './ui-view-element.model';




export class RegleValueView   {

  id?:  number;

  habilitation?:  Habilitation;

  role?:  Role;

  valueDefault?:  string;

  minNumberValue?:  number;

  maxNumberValue?:  number;

  lockedValue?:  string;

  listPossibleValues?:  string;

}
