import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardV3Component } from './dashboard-v3/dashboard-v3.component';
import { DashboardV4Component } from './dashboard-v4/dashboard-v4.component';
import { CardCustomersDashboardComponent } from './components/cards/card-customers-dashboard/card-customers-dashboard.component';
import { CardUserStatisticsComponent } from './components/cards/card-user-statistics/card-user-statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductStatisticsDashboardComponent } from './components/cards/product-statistics-dashboard/product-statistics-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboadDefaultComponent,
    DashboardV2Component,
    DashboardV3Component,
    DashboardV4Component,
    CardCustomersDashboardComponent,
    CardUserStatisticsComponent,
    ProductStatisticsDashboardComponent
  ]
})
export class DashboardModule { }
