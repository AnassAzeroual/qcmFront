import { IHabilitation } from '../admin/models/habilitation.model';
import { IRole } from '../admin/models/role.model';
import { RegleValueView } from './regle-value-view.model';

export class UiViewElement {
  id?: number;

  code?: string;

  label?: string;

  typeElement?: string;

  typeDesactivation?: string;    // D pour Desactivation, S pour Suppression

  messageDesactivation?: string;


  valueDatatype?:  string;

  
  habilitations?: IHabilitation[];

  roles?: IRole[];


  reglesValues?: RegleValueView[];
}
