

export interface INotifType   {

	id?:  number;

	code?:  string;

	labelEn?:  string;

	labelFr?:  string;

}



export class NotifType implements INotifType {
  constructor(public id?:  number,  public code?:  string,  public labelEn?:  string,  public labelFr?:  string,  ) {}
}
