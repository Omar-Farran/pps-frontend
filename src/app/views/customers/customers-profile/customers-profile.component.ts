import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
	selector: 'app-customers-profile',
	templateUrl: './customers-profile.component.html',
	styleUrls: ['./customers-profile.component.css']
})

export class CustomersProfileComponent implements OnInit {	
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder
	) { }

	branchInfoForm!: FormGroup;
  	isSubmittedBranchInfoForm = false;
	activeDestinationType = '';

	editGeneralInfoForm!: FormGroup;
	isSubmittedEditGeneralInfoForm = false;

	ngOnInit() {
		this.branchInfoForm = this.formBuilder.group({
			TradingName: ['', Validators.required],
			CurrencyCode: ['', Validators.required],
			ConsolidationQuery: [''],
			VATNumber: [''],
			EORINumber: [''],
			IOSSNumber: [''],
			AllowMultiPiece: [false],
			AccountType: ['', Validators.required],
			LicenseRegistrationNumber: [''],
			GPI: [''],
			PreferredContactLanguage: ['', Validators.required],
			IsAPIUser: [false, [conditionalRequiredValidator(['APIUserName', 'APIPassword'])]],
			APIUserName: [''],
			APIPassword: [''],

			SendEInvoice: [false, [conditionalRequiredValidator(['BranchName', 'FileNameScheme', 'FormatType', 'DestinationType'])]],
			Logo: [''],

			// Send EInvoice:
			BranchName: [''],
			FileNameScheme: ['', Validators.required],
			FormatType: ['', Validators.required],
			DestinationType: ['', Validators.required],
		}, {updateOn: 'blur'});

		this.editGeneralInfoForm = this.formBuilder.group({
			CompanyCommercialName: ['', Validators.required],
			CompanyLegalName: ['', Validators.required],
			BusinessType: ['', Validators.required],
			Status: ['', Validators.required]
		})
	}

	handleModal(modal: ElementRef, modalClass: 'side-modal') {
		this.modalService.open(modal, { 
			modalDialogClass: modalClass, 
			backdrop : 'static',
			keyboard : false 
		});
	}

	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const editGeneralInfo = document.querySelector('#editGeneralInfoForm');  
	  const branchInfo = document.querySelector('#branchInfoForm');  

	  if (event.key === 'Enter') {
		if (editGeneralInfo) {
			this.submitEditGeneralInfoForm();
		} else if (branchInfo) {
			this.submitBranchInfoForm();
		}
	  }
	}

	handleDestinationType(event: Event) {
		const target = event.target as HTMLSelectElement;
	
		this.activeDestinationType = target.value;
	}

	submitBranchInfoForm() {
		console.log(this.branchInfoForm.value);
		this.isSubmittedBranchInfoForm = true;
	}

	resetBranchInfoForm() {
		this.branchInfoForm.reset();
		this.branchInfoForm.controls.CurrencyCode.patchValue('');
        this.branchInfoForm.controls.ConsolidationQuery.patchValue('');		
		this.branchInfoForm.controls.AccountType.patchValue('');
        this.branchInfoForm.controls.PreferredContactLanguage.patchValue('');
		this.branchInfoForm.controls.FormatType.patchValue('');
        this.branchInfoForm.controls.DestinationType.patchValue('');
	}

	submitEditGeneralInfoForm() {
		console.log(this.editGeneralInfoForm.value);
		this.isSubmittedEditGeneralInfoForm = true;
	}

	resetEditGeneralInfoForm() {
		this.editGeneralInfoForm.reset();
		this.editGeneralInfoForm.controls.BusinessType.patchValue('');
        this.editGeneralInfoForm.controls.Status.patchValue('');
	}
}