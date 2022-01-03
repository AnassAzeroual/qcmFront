import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortletComponent } from './portlet/portlet.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PortletComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule
  ],
  exports: [
    PortletComponent
  ]
})
export class UiModule { }
