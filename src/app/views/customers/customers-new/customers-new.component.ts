import { Component, HostListener, OnInit } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { conditionalRequiredValidator } from 'src/app/utils/validation-dependent-fields';

@Component({
	selector: 'app-customers-new',
	templateUrl: './customers-new.component.html',
	styleUrls: ['./customers-new.component.css']
})
export class CustomersNewComponent implements OnInit {
	data: any;
  	cropperSettings: CropperSettings;



	constructor(
		private formBuilder: FormBuilder
	) {
		this.cropperSettings = new CropperSettings();
        this.cropperSettings.croppedWidth = 480;
        this.cropperSettings.croppedHeight = 480;
        this.cropperSettings.canvasWidth = 240;
        this.cropperSettings.canvasHeight = 240;
		this.cropperSettings.showCenterMarker = false;
		console.log(this.cropperSettings);

        this.data = {};
	}

	activeDestinationType = '';
	createCustomerForm!: FormGroup;
	isSubmitted = false;

	ngOnInit() {
		this.createCustomerForm = this.formBuilder.group({
			// General:
			CompanyCommercialName: ['', Validators.required],
			CompanyLegalName: ['', Validators.required],
			BusinessType: ['', Validators.required],

			// Branch information:
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

			// API User
			APIUserName: [''],
			APIPassword: [''],
	  
			SendEInvoice: [false, [conditionalRequiredValidator(['BranchName', 'FileNameScheme', 'FormatType', 'DestinationType'])]],
			Logo: [''],
	  
			// Send EInvoice:
			BranchName: [''],
			FileNameScheme: [''],
			FormatType: [''],
			DestinationType: [''],
		}, {updateOn: 'blur'});
	}

	private save() {
		console.log(this.createCustomerForm.value);
		this.isSubmitted = true;
	}

	handleDestinationType(event: Event) {
		const target = event.target as HTMLSelectElement;
	
		this.activeDestinationType = target.value;
	}

	handleSave(isDraft?: boolean): void {
		if (isDraft) {
			console.log('isDraft');
		}

		this.save();
	}

	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const createCustomer = document.querySelector('#createCustomerForm');  
 
	  if (event.key === 'Enter' && createCustomer) {
		this.handleSave();
	  }
	}
}
