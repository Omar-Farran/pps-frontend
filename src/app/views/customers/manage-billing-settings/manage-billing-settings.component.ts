import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
  selector: 'app-manage-billing-settings',
  templateUrl: './manage-billing-settings.component.html',
  styleUrls: ['./manage-billing-settings.component.scss']
})
export class ManageBillingSettingsComponent {
	active = 'General information';

	step1IsDone = false;
	step2IsDone = false;
	step3IsDone = false;
	step4IsDone = false;
	step5IsDone = false;

	constructor(
		private modalService: NgbModal,
        private formBuilder: FormBuilder,
		private router: Router,
    ) { }

    generalInfoForm!: FormGroup;
    isSubmittedGeneralInfoForm = false;

	shippingChargesForm!: FormGroup;
    isSubmittedShippingChargesForm = false;

	customsDutyForm!: FormGroup;
    isSubmittedCustomsDutyForm = false;

	codChangesForm!: FormGroup;
    isSubmittedCodChargesForm = false;

	addProfileForm!: FormGroup;
    isSubmittedAddProfileForm = false;

    ngOnInit(): void {
        this.generalInfoForm = this.formBuilder.group({
            GoodsLimit: [''],
            ChargeWeight: ['', Validators.required],
            WeightFactor: ['', Validators.required],
            MaxWeight: [''],
            MaxDimensions: [''],
        }, {updateOn: 'blur'});
		
		this.shippingChargesForm = this.formBuilder.group({
            AccountType: ['', Validators.required],
            VatRate: [''],
			Credit: [''],
            CreditLimit: [''],
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

		this.customsDutyForm = this.formBuilder.group({
            AccountType: ['', Validators.required],
            Credit: [''],
            CreditLimit: [''],
            DeliveryDuty: ['', Validators.required],
            VatRate: [''],
            isTaxApplicable: [false, [conditionalRequiredValidator(['TaxRate'])]],
            TaxRate: [''],

            InvoicingFrequency: ['', Validators.required],
            InvoicingGroup: ['', Validators.required],
			RunAt: [''],
            isDutyFeeApplicable: [false],
            DutyFees: [''],

            CalculationTriggers: [''],
            InvoiceTriggers: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});

		this.codChangesForm = this.formBuilder.group({
            InvoicingFrequency: ['', Validators.required],
            InvoicingGroup: ['', Validators.required],
            RunAt: [''],
            CalculationTriggers: [''],
            InvoiceTriggers: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});

		this.addProfileForm = this.formBuilder.group({
            ProductService: ['', Validators.required],
            ProductType: ['', Validators.required],
            Ratesheet: ['', Validators.required],
            Discount: [''],
            StartDate: ['', Validators.required],
            EndDate: ['', Validators.required],
            ShipmentServices: [''],
            Surcharges: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});

		this.handleAccountTypeValidator('shippingChargesForm');
		this.handleAccountTypeValidator('customsDutyForm');
		this.handleRunAtValidator('shippingChargesForm');
		this.handleRunAtValidator('customsDutyForm');
		this.handleRunAtValidator('codChangesForm');
    }

	handleRunAtValidator(form) {
		this[form].get('InvoicingFrequency').valueChanges.subscribe(value => {
			if (value) {
			  this[form].get('RunAt').setValidators([Validators.required]);
			} else {
			  this[form].get('RunAt').clearValidators();
			}
	  
			this[form].get('RunAt').updateValueAndValidity();
		});
	}

	handleAccountTypeValidator(form) {
		this[form].get('AccountType').valueChanges.subscribe(value => {
			if (value === 'Prepaid') {
			  this[form].get('Credit').setValidators([Validators.required]);
              this[form].get('CreditLimit').setValidators([Validators.required]);
			} else {
			  this[form].get('Credit').clearValidators();
              this[form].get('CreditLimit').clearValidators();
			}
	  
			this[form].get('Credit').updateValueAndValidity();
            this[form].get('CreditLimit').updateValueAndValidity();
		});
	}

	handleShippingCreditModal(modal) {
		this.modalService.open(modal, {
			size: 'md', 
			centered: true
		});
	}

	handleDutiesCreditModal(modal) {
		this.modalService.open(modal, {
			size: 'md', 
			centered: true
		});
	}

	onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

	updateRunAt(form) {
        this[form].get('RunAt').setValue('');
    }

	@ViewChild('nav') nav!: NgbNav;

	handleNext(navTab, step, status, form) {
		this[status] = true;		
		
		if (this[form].valid) {
			console.log(this[form].value);		
			this.nav.select(navTab)
			this[step] = true;
		}
	}

	saveSettings(step) {
		this[step] = true;
		this.router.navigateByUrl('/customers/billing-settings');
	}
}
