import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { WarehouseBalanceListComponent } from './warehouse-balance-list/warehouse-balance-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseSectionsListComponent } from './warehouse-sections-list/warehouse-sections-list.component';
import { TransactionInfoComponent } from './transaction-list/transaction-info/transaction-info.component';


const routes: Routes =
  [
    { path: 'warehouse', component: WarehouseListComponent },
    { path: 'warehouse-sections', component: WarehouseSectionsListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'warehouse-balance', component: WarehouseBalanceListComponent },
    { path: 'transaction', component: TransactionListComponent },
    { path: 'transaction/:id', component: TransactionInfoComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
