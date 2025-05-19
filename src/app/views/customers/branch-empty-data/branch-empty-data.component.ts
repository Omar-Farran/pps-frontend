import { Component, OnInit } from '@angular/core';
import { BRANCH_INFORMATION, EINVOICE } from 'src/app/data/branch';

@Component({
  selector: 'app-branch-empty-data',
  templateUrl: './branch-empty-data.component.html',
  styleUrls: ['./branch-empty-data.component.scss']
})
export class BranchEmptyDataComponent implements OnInit {
  constructor() { }

  dataEInvoice: any[] = this.convertData(EINVOICE, 2);
  dataBranchInfo: any[] = this.convertData(BRANCH_INFORMATION, 3);
  dataAttachments: any[] = [];
  dataCustomerAddress: any[] = [];
  dataCustomerSla: any[] = [];
  dataCustomerBilling: any[] = [];

  convertData(data, slice) {
    const result = [];

    for (let i = 0; i < data.length; i += slice) {
      result.push(data.slice(i, i + slice));
    }

    return result;
  }

  ngOnInit(): void {}
}
