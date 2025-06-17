import { NgModule } from '@angular/core';
import { SalesInvoiceFormComponent } from './sales-invoice-list/sales-invoice-form/sales-invoice-form.component';
import { SalesInvoiceListComponent } from './sales-invoice-list/sales-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PendingDeliveryInvoicesComponent } from './pending-delivery-invoices/pending-delivery-invoices.component';
import { InvoiceInstallmentComponent } from './invoice-installment/invoice-installment.component';




const routes: Routes =
  [
    { path: 'sales-invoice', component: SalesInvoiceListComponent },
    { path: 'sales-invoice/form', component: SalesInvoiceFormComponent },
    { path: 'sales-invoice/form/:id', component: SalesInvoiceFormComponent },
    { path: 'sales-invoice/pending-delivery-invoices', component: PendingDeliveryInvoicesComponent },
    { path: 'sales-invoice/installments', component: InvoiceInstallmentComponent },


  ];


@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class InvoiceManagementRoutingModule { }
