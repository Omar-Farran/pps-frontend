import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-warehouse-balance-list',
  templateUrl: './warehouse-balance-list.component.html',
  styleUrls: ['./warehouse-balance-list.component.scss']
})
export class WarehouseBalanceListComponent {
 columns: any[] = [
    { name: "warehouse-balance.warehouse", field: "warehouseName" },
    { name: "warehouse-balance.section", field: "sectionName" },
    { name: "warehouse-balance.branch", field: "branchName" },
    { name: "warehouse-balance.product", field: "productName" },
    { name: "warehouse-balance.balance", field: "balance" , type:'number' },
  ];
    actionList: any[] = [];
products:any[];
branchies:any[];
locations:any;
warehouses:any;
dataSource: any[] = [];
  totalCount: number = 0
  id: number = null
  public searchForm = new FormGroup
  (
    {
      warehouseId:new FormControl(null),
      branchId:new FormControl(null),
      productId:new FormControl(null),
      locationId:new FormControl(null)
    }
  )
  baseSearch = 
  {
    warehouseId: null,
    branchId:null,
    productId:null,
    locationId:null,
    pageSize: 25,
    pageNumber: 0,
  }
  //#endregion
  constructor 
  ( 
    private baseService: BaseService
  ) 
  {}
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch(null)
    this.getProducts();
    this.getBranchies();
    this.getWarehouses();
    this.getWarehouseSections();
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('WarehouseBalance', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
 
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
    let form = this.searchForm.getRawValue();
      this.baseSearch.branchId = form.branchId;
      this.baseSearch.warehouseId = form.warehouseId;
      this.baseSearch.productId = form.productId;
      this.baseSearch.locationId = form.locationId;
      this.baseSearch.pageNumber = 0;
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion

 
      onHandleAction(event) {
    switch (event.action.name) {
      case "common.edit":
        {
           
        }
         break;
        case "common.updatestatus":
        {
        }
        break;
         case "common.info":
        {
        }
        break;
    }
  }


  getProducts(){
    this.baseService.Get('Product' , 'GetAll').subscribe(res => {
      this.products = res as any[];;
    })
  }

  getBranchies(){
    this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
      this.branchies = res as any[];
    })
  }


    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

     getWarehouseSections(){
this.baseService.Get('WarehouseSections' , 'GetAll' ).subscribe(res => {
  this.locations = res;
     })}

}
