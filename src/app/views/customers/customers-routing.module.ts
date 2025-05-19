import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchEmptyDataComponent } from './branch-empty-data/branch-empty-data.component';
import { BranchComponent } from './branch/branch.component';
import { CustomersManagementComponent } from './customers-management/customers-management.component';
import { CustomersProfileComponent } from './customers-profile/customers-profile.component';
import { CustomersNewComponent } from './customers-new/customers-new.component';
import { AddressesComponent } from './addresses/addresses.component';
import { SlaComponent } from './sla/sla.component';
import { BillingSettingsComponent } from './billing-settings/billing-settings.component';
import { ManageBillingSettingsComponent } from './manage-billing-settings/manage-billing-settings.component';

const routes: Routes = [
  {
    path: 'customers-management',
    component: CustomersManagementComponent
  },
  {
    path: 'customers-profile',
    component: CustomersProfileComponent
  },
  {
    path: 'customers-new',
    component: CustomersNewComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'branch-empty-data',
    component: BranchEmptyDataComponent
  },
  {
    path: 'billing-settings',
    component: BillingSettingsComponent
  },
  {
    path: 'manage-billing-settings',
    component: ManageBillingSettingsComponent
  },
  {
    path: 'addresses',
    component: AddressesComponent
  },
  {
    path: 'sla',
    component: SlaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
