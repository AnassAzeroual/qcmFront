import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
	
	@Input()
	confirmTitle = "Confirmation";
	
	@Input()
	confirmBody = "Êtes-vous sûr de cela ?";

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}
