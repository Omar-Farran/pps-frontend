import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
 columns: any[] = [
    { name: "transaction.type", field: "typeName" },
    { name: "transaction.warehouse", field: "warehouseName" },
    { name: "transaction.section", field: "sectionName" },
    { name: "transaction.branch", field: "branchName" },
    { name: "transaction.towarehouse", field: "toWarehouseName" },
    { name: "transaction.tosection", field: "toSectionName" },
    { name: "transaction.tobranch", field: "toBranchName" }
  ];
    actionList: any[] = [
    { name: "common.info", icon: "change", permission: "Transaction-List" },
    { name: 'common.updatestatus', icon: 'change' , permission: 'Admin-Change-Status'}
  ];

dataSource: any[] = [];
  totalCount: number = 0
  id: number = null
  public searchForm = new FormGroup
  (
    {
      status: new FormControl(),
      searchValue: new FormControl()
    }
  )
  baseSearch = 
  {
    name: '',
    pageSize: 25,
    pageNumber: 0,
  }
  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router
  ) 
  {}
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch(null)
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Transaction', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddTransaction (modal: any) 
  {
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }
  onEditTransaction (entity: any, modal: any) 
  {
    this.id = entity.id;
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); });
  }
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
      this.baseSearch.name = event.target.value;
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

    onHandleAction(event, modal) {
    switch (event.action.name) {
      case "common.edit":
        {
           this.onEdit(event.data, modal);
        }
         break;
        case "common.updatestatus":
        {
           this.onChageStatus(event.data);
        }
        break;
         case "common.info":
        {
           this.onInfo(event.data);
        }
        break;
    }
  }


    onEdit(data, modal) {
    this.id = data.id;
    const modalRef = this.modalService.open(modal, {
      modalDialogClass: "side-modal",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.getList();
    });
  }


  onChageStatus (entity) 
  {
    this.baseService.Get('Transaction', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }

   onInfo(event) {
        this.router.navigate(['/product-management/transaction/' + event.id])
    }
    
}
