import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sales-invoice-list',
  templateUrl: './sales-invoice-list.component.html',
  styleUrls: ['./sales-invoice-list.component.scss']
})
export class SalesInvoiceListComponent {
columns: any[] = [
    { name: "sales-invoice.invoiceNumber", field: "invoiceNumber" },
    { name: "sales-invoice.InvoiceDate", field: "invoiceDate" , type:'date' },
    { name: "sales-invoice.customerName", field: "customerName" },
    { name: "sales-invoice.sourceType", field: "sourceTypeName" , isTranslate:true },
    { name: "sales-invoice.totalAmount", field: "totalAmount" , type:'number' },
    { name: "sales-invoice.status", field: "invoiceStatus" ,  isTranslate:true }
  ];
    actionList: any[] = [
    { name: "common.edit", icon: "change", permission: "Sales-Invoices-Form" },
  ];
warehouses:any;
sections:any;
dataSource: any[] = [];
  totalCount: number = 0
  id: number = null;
  filteredInvoices:any;
  searchInvoices:string;
  public searchForm = new FormGroup
  (
    {
      invoiceDateFrom:new FormControl(null),
      invoiceDateTo:new FormControl(null),
      invoiceNumber:new FormControl(null),
      customerName:new FormControl(null)

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    type:InvoiceType.SalesInvoice,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    invoiceId:null,
    customerName:null
  }
  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router,
    private translate: TranslateService
    
  ) 
  {}
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch();
    this.searchInvoices = this.translate.instant('sales-invoice.seasrch-invoice')

  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Invoice', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddSalesInvoice () 
  {
    this.router.navigate(['invoice-management/sales-invoice/form']);
  }

  
  onEditInvoice (entity: any, modal: any) 
  {
    this.id = entity.id;
    this.router.navigate(['/invoice-management/sales-invoice/form/' + this.id])
  }
  //#endregion
  //#region Filtering and Searching
  onSearch() {
    
    let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){
    if(searchFormValue.invoiceNumber)
    this.baseSearch.invoiceId = searchFormValue.invoiceNumber.id;
    this.baseSearch.customerName = searchFormValue.customerName;

   if(searchFormValue.invoiceDateFrom){
           this.baseSearch.invoiceDateFrom = new Date(searchFormValue.invoiceDateFrom.year, searchFormValue.invoiceDateFrom.month - 1, searchFormValue.invoiceDateFrom.day);
    }
     if(searchFormValue.invoiceDateTo){
           this.baseSearch.invoiceDateTo = new Date(searchFormValue.invoiceDateTo.year, searchFormValue.invoiceDateTo.month - 1, searchFormValue.invoiceDateTo.day);
    }

    
    }
      this.baseSearch.pageNumber = 0;
      this.baseSearch.type = InvoiceType.SalesInvoice;
      
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
           this.onEdit(event.data);
        }
        break;
    }
  }


    onEdit(data) {
    this.id = data.id;
        this.router.navigate(['invoice-management/sales-invoice/form/' + this.id]);
  }


  onChageStatus (entity) 
  {
    this.baseService.Get('Invoice', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }


  resetSearchForm(){
      this.searchForm.reset();
      this.baseSearch.invoiceDateTo = null;
      this.baseSearch.invoiceDateFrom = null;
      this.baseSearch.invoiceId = null;
      this.onSearch();
     }

        filterInvoices(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
  
  }

    getSelectItemList(query){
      this.baseService.Get('Invoice' , 'GetSelectItemsList?query=' + query ).subscribe(res => {
        this.filteredInvoices = res 
    })
    }
}
