import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConfigurationRoutingModule } from './configuration.routing.module';
import { ManageEntityComponent } from './entity/manage-entity/manage-entity.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';


const COMPONENTS: any[] = [
  EntityListComponent,ManageEntityComponent
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ConfigurationRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class ConfigurationModule {}
