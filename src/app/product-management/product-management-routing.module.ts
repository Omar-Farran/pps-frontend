import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { WarehouseBalanceListComponent } from './warehouse-balance-list/warehouse-balance-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';



const routes: Routes = 
[
  { path: 'products', component: ProductListComponent },
  { path: 'warehouse-balance', component: WarehouseBalanceListComponent },
  { path: 'transaction', component: TransactionListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
