import { IHabilitation } from '../admin/models/habilitation.model';
import { IRole } from '../admin/models/role.model';
import { UiViewElement } from './ui-view-element.model';

export class UiView {
  id?: number;

  name?: string;

  elements?: UiViewElement[];

  habilitations?: IHabilitation[];

  roles?: IRole[];
}
