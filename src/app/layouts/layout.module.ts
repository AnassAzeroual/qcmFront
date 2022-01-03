import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplebarAngularModule } from 'simplebar-angular';
import { DemoPartageModule } from './partage/demo-partage.module';
import { RouterModule } from '@angular/router';
import { LayoutContainerComponent } from './layout-container.component';
import { VerticalModule } from './vertical/vertical.module';
import { HorizontalModule } from './horizontal/horizontal.module';
import { DetachedModule } from './detached/detached.module';



@NgModule({
  declarations: [
    LayoutContainerComponent
  ],
  imports: [
    CommonModule,
    SimplebarAngularModule,
    DemoPartageModule,
    VerticalModule,
    HorizontalModule,
    DetachedModule,
    RouterModule
  ],
  exports: [
    LayoutContainerComponent
  ]
})
export class LayoutModule { }
