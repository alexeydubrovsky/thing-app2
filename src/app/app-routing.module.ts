import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingsComponent } from './things/things.component';
import { ThingDetailComponent } from './thing-detail/thing-detail.component';
import { ThingCreateComponent } from './thing-create/thing-create.component';

const routes: Routes = [
  { path: 'things', component: ThingsComponent },
  { path: "create", component: ThingCreateComponent },
  { path: 'detail/:id', component: ThingDetailComponent },
  { path: '', redirectTo: '/things', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
