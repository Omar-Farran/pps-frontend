import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { installmentStatus, InstallmentStatus, InvoiceType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Installment } from 'src/app/data/installment';

@Component({
  selector: 'app-invoice-installment',
  templateUrl: './invoice-installment.component.html',
  styleUrls: ['./invoice-installment.component.scss']
})
export class InvoiceInstallmentComponent {
columns: any[] = [
    { name: "invoice-installment.invoiceNumber", field: "invoiceNumber" },
    { name: "invoice-installment.dueDate", field: "dueDate" , type:'date' },
    { name: "invoice-installment.amount", field: "amount", type:'number' },
    { name: "invoice-installment.status", field: "statusName" , isTranslate:true },
    { name: "invoice-installment.paidDate", field: "paidDate" , type:'date' }
  ];
    actionList: any[] = [
    { name: "invoice-installment.markaspaid", icon: "change", permission: "Installments" },
    { name: "invoice-installment.markasoverdue", icon: "change", permission: "Installments" }
  ];
  installmentStatus= installmentStatus;

dataSource: any[] = [];
  totalCount: number = 0
  id: number = null;
  filteredInvoices:any;
  searchInvoices:string;
  public searchForm = new FormGroup
  (
    {
      dueDateFrom:new FormControl(null),
      dueDateTo:new FormControl(null),
      invoiceNumber:new FormControl(null),
      status:new FormControl(InstallmentStatus.UnPaid)

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    status:InstallmentStatus.UnPaid,
    dueDateFrom:null,
    dueDateTo:null,
    invoiceId:null
  }
  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
    
  ) 
  {

    const date = new Date();
    const newDate = {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, 
                          day: date.getDate()
                        }
    this.searchForm.get('dueDateFrom').setValue(newDate);
     this.searchForm.get('dueDateTo').setValue(newDate);
  }
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch();
    this.searchInvoices = this.translate.instant('sales-invoice.seasrch-invoice')

  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('InvoiceInstallment', 'List', this.baseSearch).subscribe
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
  onSearch() {
    
    let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){
    if(searchFormValue.invoiceNumber)

   if(searchFormValue.dueDateFrom){
           this.baseSearch.dueDateFrom = new Date(searchFormValue.dueDateFrom.year, searchFormValue.dueDateFrom.month - 1, searchFormValue.dueDateFrom.day);
    }
     if(searchFormValue.dueDateTo){
           this.baseSearch.dueDateTo = new Date(searchFormValue.dueDateTo.year, searchFormValue.dueDateTo.month - 1, searchFormValue.dueDateTo.day);
    }
    }
    if(searchFormValue.status)
       this.baseSearch.status = Number(searchFormValue.status);
      else 
      this.baseSearch.status = null;
       this.baseSearch.invoiceId = searchFormValue.invoiceNumber?.id;
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
           case "invoice-installment.markaspaid":
        {
           this.onMarkAsPaid(event.data);
        }
        break;
          case "invoice-installment.markasoverdue":
        {
           this.onMarkAsOverdue(event.data);
        }
        break;
    }
  }

onMarkAsPaid(data){
let form = {
  id:data.id,
  status:InstallmentStatus.Paid
}
if(data.status == InstallmentStatus.Paid){
   this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('error.installmentalreadypaid'),
    { timeOut: 3000 })
    return;
}
this.updateInstallmentStatus(form);
}



onMarkAsOverdue(data){
let form = {
  id:data.id,
  status:InstallmentStatus.Overdue
}
if(data.status == InstallmentStatus.Paid){
   this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('error.installmentalreadypaid'),
    { timeOut: 3000 })
    return;
}
this.updateInstallmentStatus(form);
}

updateInstallmentStatus(form){
  this.baseService.Post('InvoiceInstallment' , 'UpdateInstallmentStatus' , form).subscribe(res=> {
    if(res){
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('invoice-installment.statusupdatedsuccessflly'),
    { timeOut: 3000 })
    this.onSearch();
    }
})
}





  resetSearchForm(){
      this.searchForm.reset();
      this.baseSearch.dueDateTo = null;
      this.baseSearch.dueDateFrom = null;
      this.baseSearch.status = null;
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
