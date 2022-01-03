import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPartageModule } from '../partage/demo-partage.module';
import { LayoutComponent } from './layout/layout.component';
import { TopnavComponent } from './topnav/topnav.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LayoutComponent,
    TopnavComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    RouterModule,
    DemoPartageModule
  ],
  exports: [LayoutComponent, TopnavComponent]
})
export class HorizontalModule { }
