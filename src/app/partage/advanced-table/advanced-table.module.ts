import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbSortableHeaderDirective } from './sortable.directive';
import { AdvancedTableComponent } from './advanced-table.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    NgbSortableHeaderDirective,
    AdvancedTableComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  exports: [AdvancedTableComponent]
})
export class AdvancedTableModule { }
