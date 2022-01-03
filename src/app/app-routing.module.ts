import { AuthGuardService } from './shared/services/auth-guard.service';
import { LayoutContainerComponent } from "./layouts/layout-container.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "document",
    component: LayoutContainerComponent,
    loadChildren: () =>
      import("./testdocument/testdocument.module").then(
        (m) => m.TestdocumentModule
      ),
    canActivate: [AuthGuardService]
  },
 
  {
    path: "qcm",
    component: LayoutContainerComponent,
    loadChildren: () =>
      import("./QCM/QCM.module").then((m) => m.QCMModule),
      //canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
