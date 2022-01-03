import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { DemoPartageModule } from "../partage/demo-partage.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, DemoPartageModule, RouterModule, SharedModule],
  exports: [LayoutComponent],
})
export class VerticalModule {}
