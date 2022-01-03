import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { AffectationQCMComponent } from "./affectationQcm/AffectationQCM/AffectationQCM.component";
import { QcmCandidatComponent } from "./affectationQcm/QcmCandidat/QcmCandidat.component";
import { GestionCandidatComponent } from "./Candidat/GestionCandidat/GestionCandidat.component";
import { ListCandidatComponent } from "./Candidat/ListCandidat/ListCandidat.component";
import { BienvenuQCMComponent } from "./Qcm/BienvenuQCM/BienvenuQCM.component";
import { CommencerQcmComponent } from "./Qcm/CommencerQcm/CommencerQcm.component";
import { GestionQcmComponent } from "./Qcm/GestionQcm/GestionQcm.component";
import { ListQcmComponent } from "./Qcm/ListQcm/ListQcm.component";
import { ResultatQcmComponent } from "./Qcm/ResultatQcm/ResultatQcm.component";

const routes: Routes = [
  {
    path: "",
    component:ListCandidatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "list-candidat",
    component:ListCandidatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "list-qcm",
    component:ListQcmComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "gestion-candidat",
    component:GestionCandidatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "gestion-qcm",
    component:GestionQcmComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "affectation-qcm",
    component:AffectationQCMComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "qcm-candidat",
    component:QcmCandidatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "bienvenu-qcm",
    component:BienvenuQCMComponent,
  },
  {
    path: "commencer-qcm",
    component:CommencerQcmComponent,
  },
  {
    path: "resultat-qcm",
    component:ResultatQcmComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QCMRoutingModule { }
