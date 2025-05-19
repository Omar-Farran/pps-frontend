import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-card-e-invoice',
  templateUrl: './card-e-invoice.component.html',
  styleUrls: ['./card-e-invoice.component.scss']
})
export class CardEInvoiceComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  @Input() dataEInvoice;

  activeDestinationType = '';
  eInvoiceForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.eInvoiceForm = this.formBuilder.group({
      FileNameScheme: ['', Validators.required],
      FormatType: ['', Validators.required],
      DestinationType: ['', Validators.required],
      ToEmail: [''],
      Cc: [''],
      Bcc: [''],
      Subject: [''],
      Body: [''],
      FilePath: [''],
      Server: [''],
      Port: [''],
      UserName: [''],
      Password: [''],
    }, {updateOn: 'blur'});
  }

  @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const eInvoice = document.querySelector('#eInvoiceForm');  
  
	  if (event.key === 'Enter' && eInvoice) {
		  this.submitForm();
	  }
	}

  handleModal(modal) {
		this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

  handleDestinationType(event: Event) {
    const target = event.target as HTMLSelectElement;

    this.activeDestinationType = target.value;
  }

  resetForm() {
    this.eInvoiceForm.reset();
    this.eInvoiceForm.controls['FormatType'].setValue('');
    this.eInvoiceForm.controls['DestinationType'].setValue('');
    this.activeDestinationType = '';
  }

  submitForm() {
    console.log(this.eInvoiceForm.value);
    this.isSubmitted = true;
  }
}
