import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCandidatComponent } from './Candidat/ListCandidat/ListCandidat.component';
import { ListQcmComponent } from './Qcm/ListQcm/ListQcm.component';
import { GestionCandidatComponent } from './Candidat/GestionCandidat/GestionCandidat.component';
import { GestionQcmComponent } from './Qcm/GestionQcm/GestionQcm.component';
import { QCMRoutingModule } from './QCM-routing.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AffectationQCMComponent } from './affectationQcm/AffectationQCM/AffectationQCM.component';
import { QcmCandidatComponent } from './affectationQcm/QcmCandidat/QcmCandidat.component';
import { BienvenuQCMComponent } from './Qcm/BienvenuQCM/BienvenuQCM.component';
import { CommencerQcmComponent } from './Qcm/CommencerQcm/CommencerQcm.component';
import { ResultatQcmComponent } from './Qcm/ResultatQcm/ResultatQcm.component';
import { NgxNoCopyModule } from 'ngx-no-copy';

@NgModule({
  imports: [
    CommonModule, QCMRoutingModule, GridModule, ReactiveFormsModule, SharedModule, FormsModule,NgbModule,NgxNoCopyModule
  ],
  declarations: [
    ListCandidatComponent,
    ListQcmComponent,
    GestionCandidatComponent,
    GestionQcmComponent,
    AffectationQCMComponent,
    QcmCandidatComponent,
    BienvenuQCMComponent,
    CommencerQcmComponent,
    ResultatQcmComponent,
  ]
})
export class QCMModule { }
