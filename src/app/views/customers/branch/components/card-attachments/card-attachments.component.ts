import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-attachments',
  templateUrl: './card-attachments.component.html',
  styleUrls: ['./card-attachments.component.scss']
})
export class CardAttachmentsComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
  }

  @Input() dataAttachments;

  handleModal(modal) {
		this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}
}
