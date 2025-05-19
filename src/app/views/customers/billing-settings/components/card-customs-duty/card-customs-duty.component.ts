import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
    selector: 'app-card-customs-duty',
    templateUrl: './card-customs-duty.component.html',
    styleUrls: ['./card-customs-duty.component.scss']
})
export class CardCustomsDutyComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    customsDutyForm!: FormGroup;
    isSubmittedCustomsDutyForm = false;

    ngOnInit(): void {
        this.customsDutyForm = this.formBuilder.group({
            AccountType: ['', Validators.required],
            Credit: ['', Validators.required],
            CreditLimit: ['', Validators.required],
            DeliveryDuty: ['', Validators.required],
            VatRate: [''],
            isTaxApplicable: [false, [conditionalRequiredValidator(['TaxRate'])]],
            TaxRate: [''],

            InvoicingFrequency: ['', Validators.required],
            RunAt: [''],
            InvoicingGroup: ['', Validators.required],
            isDutyFeeApplicable: [false],
            DutyFees: [''],

            CalculationTriggers: [''],
            InvoiceTriggers: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});

        this.customsDutyForm.get('AccountType').valueChanges.subscribe(value => {
			if (value !== 'Postpaid') {
			  this.customsDutyForm.get('Credit').setValidators([Validators.required]);
              this.customsDutyForm.get('CreditLimit').setValidators([Validators.required]);
              this.customsDutyForm.get('DeliveryDuty').setValidators([Validators.required]);
              this.customsDutyForm.get('VatRate').setValidators([Validators.required]);
			} else {
			  this.customsDutyForm.get('Credit').clearValidators();
              this.customsDutyForm.get('CreditLimit').clearValidators();
              this.customsDutyForm.get('DeliveryDuty').clearValidators();
              this.customsDutyForm.get('VatRate').clearValidators();
			}
	  
			this.customsDutyForm.get('Credit').updateValueAndValidity();
            this.customsDutyForm.get('CreditLimit').updateValueAndValidity();
            this.customsDutyForm.get('DeliveryDuty').updateValueAndValidity();
            this.customsDutyForm.get('VatRate').updateValueAndValidity();
		});

		this.customsDutyForm.get('InvoicingFrequency').valueChanges.subscribe(value => {
			if (value) {
			  this.customsDutyForm.get('RunAt').setValidators([Validators.required]);
			} else {
			  this.customsDutyForm.get('RunAt').clearValidators();
			}
	  
			this.customsDutyForm.get('RunAt').updateValueAndValidity();
		});
    }

    handleModal(modal) {
        this.modalService.open(modal, { 
            modalDialogClass: 'side-modal side-modal-half', 
            backdrop : 'static',
            keyboard : false 
        });
    }

    handleDutiesCreditModal(modal) {
		this.modalService.open(modal, {
			size: 'md', 
			centered: true
		});
	}

    updateRunAt() {
        this.customsDutyForm.get('RunAt').setValue('');
    }

    onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

    @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
        const customsDutyForm = document.querySelector('#customsDutyForm');  
        const dutiesCredit = document.querySelector('#dutiesCredit');  

        if (event.key === 'Enter') {
            if (customsDutyForm && !dutiesCredit) {
                this.submitCustomsDutyForm();
            }
        }
	}

    submitCustomsDutyForm() {        
        this.isSubmittedCustomsDutyForm = true;
    }

    resetCustomsDutyForm() {
        this.customsDutyForm.reset();
        this.customsDutyForm.controls.AccountType.patchValue('');
		this.customsDutyForm.controls.DeliveryDuty.patchValue('');
        this.customsDutyForm.controls.InvoicingFrequency.patchValue('');
		this.customsDutyForm.controls.InvoicingGroup.patchValue('');
        this.customsDutyForm.controls.CalculationTriggers.patchValue('');
		this.customsDutyForm.controls.InvoiceTriggers.patchValue('');
		this.customsDutyForm.controls.Status.patchValue('');
    }
}