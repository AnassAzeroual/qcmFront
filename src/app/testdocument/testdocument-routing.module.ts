import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { DocumentEditComponent } from './document-edit/document-edit.component';
import { DocumentListComponent } from './document-list/document-list.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentListComponent,
    pathMatch: 'full'  ,
    data: { breadcrumb: ''} ,
    canActivate: []
  },
  {
    path: 'edit/:id',
    component: DocumentEditComponent,
    pathMatch: 'full'  ,
    data: { breadcrumb: ''} ,
    canActivate: [],
    canDeactivate: [CanDeactivateGuard]
  },
  {path: 'edit', redirectTo: 'edit/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestdocumentRoutingModule { }
