import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-reader',
  templateUrl: './input-reader.component.html',
  styleUrls: ['./input-reader.component.scss']
})
export class InputReaderComponent implements OnInit {
	
	@Input()
	title = "Input";
	
	@Input()
	body = "What is your answer ?";

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
