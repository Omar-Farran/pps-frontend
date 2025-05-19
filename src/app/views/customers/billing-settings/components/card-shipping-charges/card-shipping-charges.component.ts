
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
    selector: 'app-card-shipping-charges',
    templateUrl: './card-shipping-charges.component.html',
    styleUrls: ['./card-shipping-charges.component.scss']
})
export class CardShippingChargesComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    shippingChargesForm!: FormGroup;
    isSubmittedShippingChargesForm = false;

    ngOnInit(): void {
        this.shippingChargesForm = this.formBuilder.group({
            AccountType: ['', Validators.required],
            VatRate: ['', [Validators.required]],
            Credit: ['', [Validators.required]],
            CreditLimit: ['', [Validators.required]],
            isTaxApplicable: [false, [conditionalRequiredValidator(['TaxRate'])]],
            TaxRate: [''],

            InvoicingFrequency: ['', Validators.required],
            RunAt: [''],
            InvoicingGroup: ['', Validators.required],
            InvoicingCriteria: [''],
            WeightRateLogic: ['', Validators.required],
            isChargesApplicable: [false],
            ChargesFees: [''],

            CalculationTriggers: [''],
            InvoiceTriggers: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});
        
        this.shippingChargesForm.get('AccountType').valueChanges.subscribe(value => {
			if (value !== 'Postpaid') {
			  this.shippingChargesForm.get('Credit').setValidators([Validators.required]);
              this.shippingChargesForm.get('CreditLimit').setValidators([Validators.required]);
              this.shippingChargesForm.get('VatRate').setValidators([Validators.required]);
			} else {
			  this.shippingChargesForm.get('Credit').clearValidators();
              this.shippingChargesForm.get('CreditLimit').clearValidators();
              this.shippingChargesForm.get('VatRate').clearValidators();
			}
	  
			this.shippingChargesForm.get('Credit').updateValueAndValidity();
            this.shippingChargesForm.get('CreditLimit').updateValueAndValidity();
            this.shippingChargesForm.get('VatRate').updateValueAndValidity();
		});

		this.shippingChargesForm.get('InvoicingFrequency').valueChanges.subscribe(value => {
			if (value) {
			    this.shippingChargesForm.get('RunAt').setValidators([Validators.required]);
			} else {
			    this.shippingChargesForm.get('RunAt').clearValidators();
			}
	  
			this.shippingChargesForm.get('RunAt').updateValueAndValidity();
		});
    }

    handleModal(modal) {
        this.modalService.open(modal, { 
            modalDialogClass: 'side-modal side-modal-half', 
            backdrop : 'static',
            keyboard : false 
        });
    }

    handleShippingCreditModal(modal) {
		this.modalService.open(modal, {
			size: 'md', 
			centered: true
		});
	}

    updateRunAt() {
        this.shippingChargesForm.get('RunAt').setValue('');
    }

    onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

    @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
        const shippingChargesForm = document.querySelector('#shippingChargesForm');  

        if (event.key === 'Enter' && shippingChargesForm) {
            this.submitShippingChargesForm();
        }
	}

    submitShippingChargesForm() {        
        this.isSubmittedShippingChargesForm = true;
    }

    resetShippingChargesForm() {
        this.shippingChargesForm.reset();
        this.shippingChargesForm.controls.AccountType.patchValue('');
		this.shippingChargesForm.controls.InvoicingFrequency.patchValue('');
        this.shippingChargesForm.controls.RunAt.patchValue('');
		this.shippingChargesForm.controls.InvoicingGroup.patchValue('');
		this.shippingChargesForm.controls.InvoicingCriteria.patchValue('');
		this.shippingChargesForm.controls.WeightRateLogic.patchValue('');
        this.shippingChargesForm.controls.CalculationTriggers.patchValue('');
		this.shippingChargesForm.controls.InvoiceTriggers.patchValue('');
		this.shippingChargesForm.controls.Status.patchValue('');
    }
}

