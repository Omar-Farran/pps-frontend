import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
  selector: 'app-card-branch-information',
  templateUrl: './card-branch-information.component.html',
  styleUrls: ['./card-branch-information.component.scss']
})
export class CardBranchInformationComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  @Input() dataBranchInfo;

  branchInfoForm!: FormGroup;
  isSubmittedBranchInfoForm = false;
  activeDestinationType = '';

  ngOnInit(): void {
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
  }

  handleModal(modal) {
		this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

  @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const branchInfo = document.querySelector('#branchInfoForm');  
  
	  if (event.key === 'Enter' && branchInfo) {
		  this.submitBranchInfoForm();
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
}
