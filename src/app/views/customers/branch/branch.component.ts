import { Component, OnInit } from '@angular/core';
import { 
  EINVOICE,
  ATTACHMENTS,
  BRANCH_INFORMATION,
  ADDRESS,
  SLA,
  BILLING
} from '../../../data/branch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  constructor(
    private modalService: NgbModal
  ) { }

  dataEInvoice: any[] = this.convertData(EINVOICE, 2);
  dataBranchInfo: any[] = this.convertData(BRANCH_INFORMATION, 3);
  dataAttachments: any[] = ATTACHMENTS;
  dataCustomerAddress: any[] = ADDRESS;
  dataCustomerSla: any[] = SLA;
  dataCustomerBilling: any[] = BILLING;

  convertData(data, slice) {
    const result = [];

    for (let i = 0; i < data.length; i += slice) {
      result.push(data.slice(i, i + slice));
    }

    return result;
  }

  handleModal(filtersPopup) {
		this.modalService.open(filtersPopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

  ngOnInit(): void {}
}
