import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ManageBillingSettingsComponent } from './manage-billing-settings.component';

describe('ManageBillingSettingsComponent', () => {
    let component: ManageBillingSettingsComponent;
    let fixture: ComponentFixture<ManageBillingSettingsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [ ManageBillingSettingsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageBillingSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});