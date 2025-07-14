import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-card-user-statistics',
  templateUrl: './card-user-statistics.component.html',
  styleUrls: ['./card-user-statistics.component.scss']
})
export class CardUserStatisticsComponent implements OnInit {
  model:any;
  constructor(private baseService:BaseService,private router:Router) { }

  ngOnInit(): void {
  this.getCustomerStatistics();
  }

  getCustomerStatistics(){
    this.baseService.Get('Dashboard' , 'GetCustomersStatistics').subscribe(res => {
  this.model = res;
    })
  }


   goToCustomers(){
   this.router.navigate(['company-management/customers'])
  }

  goToSuppliers(){
   this.router.navigate(['company-management/suppliers'])
  }

   goToProducts(){
   this.router.navigate(['product-management/products'])
  }



}
