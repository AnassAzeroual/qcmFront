import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountEditComponent } from './account-edit/account-edit.component';


export const sharedRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService],  data: {authorities: ['ROLE_SUPERADMIN']},
  },
  {
    path: 'notifications/:idhash',
    component: NotificationsComponent,
    pathMatch: 'full'  ,
    data: { create: false, breadcrumb: 'Notifications'} ,
    canActivate: [AuthGuardService]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    pathMatch: 'full'  ,
    data: { create: false, breadcrumb: 'Notifications'} ,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account-edit',
    component: AccountEditComponent,
    pathMatch: 'full',
    data: { create: false, breadcrumb: 'Account Edit'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(sharedRoutes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
