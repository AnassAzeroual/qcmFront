import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../shared/services/loader.service';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  @Input() showCount = 0;
  //show = false;
  private subscription: Subscription;

  _nosubscription = false;

  
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    
    if( ! this._nosubscription) {
      this.subscription = this.loaderService.loaderState
              .subscribe((state: boolean) => {
                  // this.show = state;

                  if(state) {
                    this.showCount = this.showCount + 1;
                  } else {
                    this.showCount = this.showCount - 1;
                  }

                  // console.log('this.showCount', this.showCount);
              });
    }
  }



  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
  
  
  @Input()
  set nosubscription(nosubs: boolean) {
    this._nosubscription = nosubs;

    if(this._nosubscription)
      if(this.subscription) {
        this.subscription.unsubscribe();
        this.subscription=null;
      }
  }
  
  

}
