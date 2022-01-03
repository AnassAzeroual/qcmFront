import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { DemoPartageModule } from '../partage/demo-partage.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DemoPartageModule
  ],
  exports: [LayoutComponent]
})
export class DetachedModule { }
