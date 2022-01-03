import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormsModule } from '@angular/forms';
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
  declarations: [
    LeftSideBarComponent,
    FooterComponent,
    RightSideBarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    SimplebarAngularModule,
    ClickOutsideModule
  ],
  exports: [LeftSideBarComponent, FooterComponent, RightSideBarComponent, TopbarComponent]
})
export class DemoPartageModule { }
