
import { Moment } from 'moment';

import { IUser } from './user.model';
import { INotifType } from './notif-type.model';



export interface INotification   {

	idhash?:  string;

	recipient?:  IUser;

	notificationType?:  INotifType;

	entityId?:  number;

	creationDate?:  Moment;

	sendmailDate?:  Moment;

	readDate?:  Moment;

	read?:  boolean;

	subject?:  string;

	message?:  string;

}



export class Notification implements INotification {
  constructor(public idhash?:  string,  public recipient?:  IUser,  public notificationType?:  INotifType,  public entityId?:  number,  public creationDate?:  Moment,  public sendmailDate?:  Moment,  public readDate?:  Moment,  public read?:  boolean,  public subject?:  string,  public message?:  string,  ) {}
}


