import { NgModule } from '@angular/core';
import { SalesInvoiceFormComponent } from './sales-invoice-list/sales-invoice-form/sales-invoice-form.component';
import { SalesInvoiceListComponent } from './sales-invoice-list/sales-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes =
  [
    { path: 'sales-invoice', component: SalesInvoiceListComponent },
    { path: 'sales-invoice/form', component: SalesInvoiceFormComponent },
    { path: 'sales-invoice/form/:id', component: SalesInvoiceFormComponent }
  ];


@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class InvoiceManagementRoutingModule { }
