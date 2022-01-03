import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParametersComponent } from './parameters/parameters.component';
import { UsersComponent } from './users/users.component';
import { ElementViewsComponent } from './views-habilitations/element-views/element-views.component';
import { ViewsHabilitationsComponent } from './views-habilitations/views-habilitations.component';

const routes: Routes = [
	{ path: 'parameters', component: ParametersComponent, pathMatch: 'full'  , data: { breadcrumb: 'Parameters'}  },
	{ path: 'users', component: UsersComponent, pathMatch: 'full'  , data: { breadcrumb: 'Users'}  },
	{ path: 'views', component: ViewsHabilitationsComponent, pathMatch: 'full'  , data: { breadcrumb: 'Views/Habilitations'}  },
	{ path: 'viewelements', component: ElementViewsComponent, pathMatch: 'full'  , data: { breadcrumb: 'View Elements'}  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
