import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';


const routes: Routes =
    [
        { path: 'category-list', component: CategoryListComponent },
        { path: 'category-form', component: CategoryFormComponent },
    ];
@NgModule
    (
        {
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        }
    )
export class ProductionProductsRoutingModule { }