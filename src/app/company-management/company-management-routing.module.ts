import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { CompanyInfoComponent } from './company-list/company-info/company-info.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';



const routes: Routes =
  [
    { path: 'companies', component: CompanyListComponent },
    { path: 'companies/:id', component: CompanyInfoComponent },
    { path: 'branchies', component: BranchListComponent },
    { path: 'customers', component: CustomersListComponent },
    { path: 'suppliers', component: SuppliersListComponent },
  ];
@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class CompanyManagementRoutingModule { }
