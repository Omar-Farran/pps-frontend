import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookupsListComponent } from './lookups-list/lookups-list.component';
const routes: Routes =
  [
    { path: 'nationality/:typeId', component: LookupsListComponent },
  ];
@NgModule
(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class LookupsRoutingModule {}