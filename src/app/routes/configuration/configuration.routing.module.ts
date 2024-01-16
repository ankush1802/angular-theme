import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEntityComponent } from './entity/manage-entity/manage-entity.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';


const routes: Routes = [
  { path: 'entities', component: EntityListComponent },
  { path: 'manage-entity', component: ManageEntityComponent },
  { path: 'manage-entity/:id', component: ManageEntityComponent },
  { path: 'users', component: EntityListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
