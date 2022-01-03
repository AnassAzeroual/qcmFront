import { Injectable } from '@angular/core';

import { Alert } from '../models/alert';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  lastAlert: Alert = null;

  constructor() { }
  
  
  

  change: Subject<Alert> = new Subject();

  
  // private isSameAlert(currentAlert): boolean {
  //   // if(this.lastAlert && currentAlert && this.lastAlert.type === currentAlert.type && this.lastAlert.content === currentAlert.content) {
  //   //   return true;
  //   // }
  //   // else {
  //   //   return false;
  //   // }

  //   return false;
  // }
  
  info(message: string,  type: string = 'DIV') {
    let currentAlert = <Alert>{level: 0, content: message, type: type};

    // if(this.isSameAlert(currentAlert)) {
    //   return ;
    // }

    this.change.next(currentAlert);

    this.lastAlert = currentAlert;
  }
                     
                     
  warning(message: string,  type: string = 'DIV') {
    let currentAlert = <Alert>{level: 1, content: message, type: type};
    
    // if(this.isSameAlert(currentAlert)) {
    //   return ;
    // }

    this.change.next(currentAlert);

    this.lastAlert = currentAlert;
  }
  
  
  error(message: string,  type: string = 'DIV') {
    let currentAlert = <Alert>{level: 2, content: message, type: type};
    
    // if(this.isSameAlert(currentAlert)) {
    //   return ;
    // }
    
    this.change.next(currentAlert);

    this.lastAlert = currentAlert;
  }
  
  clear() {
    this.change.next(null);
  }
  
}
