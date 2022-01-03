
import { Moment } from 'moment';
import { DummyClient } from './DummyClient';

import { DummyDocumentType } from './DummyDocumentType';



export class DummyDocument   {

  id?:  number;

  dateCreation?:  Moment;

  statut?:  string;

  type?:  DummyDocumentType;

  nom?:  string;

  client?:  DummyClient;

  tags?:  string[];

  montant?: number;

  quantite?: number;

  tel?: string;

  flag?: string;    // 'A'  pour 'LABEL1'    'B'  pour 'LABEL2'     autres valeurs possibles à ajouter si besoin

  option1?: boolean;

  option2?: boolean;

}