import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';


const COMPONENTS: any[] = [
  FormsElementsComponent,
  FormsSelectComponent,
  FormsDynamicComponent,
  FormsDatetimeComponent,
];
const COMPONENTS_DYNAMIC: any[] = [FormsSelectEditComponent];

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class EntitiesModule {}
