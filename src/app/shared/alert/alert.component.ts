import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../shared/services/alert.service';
import { Alert } from '../../shared/models/alert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  alert: Alert = null;
  private subscription: Subscription;
  
  showToast = false;
	
	
  @ViewChild('modalAlert') modalAlert: any;
	
	
  
  constructor(private alertService: AlertService, private modalService: NgbModal, private zone: NgZone) { }

  ngOnInit() {
    this.subscription = this.alertService.change.subscribe(alert => {
          this.alert = alert;

          if(this.alert.type !== 'MODAL')
            this.showToast = true;
					
					
					if(this.alert && this.alert.type === 'MODAL') {
						this.modalService.open(this.modalAlert, { ariaLabelledBy: 'modal-basic-title', centered: true })
							.result.then((result) => {
							}, (reason) => {
							});
					}
					
					this.zone.run(() => {
                console.log('enabled time travel');
            });
    });
  }
  
  
  
  onClose() {
    this.alertService.clear();
  }

  
  onCloseToast() {
    this.showToast = false;
  }


  ngOnDestroy() {
    //console.log('LoaderComponent.onDestroy');
    this.subscription.unsubscribe();
  }

}
