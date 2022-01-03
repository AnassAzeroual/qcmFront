import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InputReaderComponent } from '../input-reader/input-reader.component';
import { ConfirmComponent } from '../confirm/confirm.component';


@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  

  

  constructor(private modalService: NgbModal, ) { }
  
  
	
	
	
	getStringInput(title: string,   body: string) {
    let modalRef = this.modalService.open(InputReaderComponent);
		if(title)
			modalRef.componentInstance.title = title;
		if(body)
			modalRef.componentInstance.body = body;
		
		return modalRef.result;
  }

	
	
	confirm(title: string,   body: string) {
    let modalRef = this.modalService.open(ConfirmComponent);
		if(title)
			modalRef.componentInstance.confirmTitle = title;
		if(body)
			modalRef.componentInstance.confirmBody = body;
		
		return modalRef.result;
  }

}
