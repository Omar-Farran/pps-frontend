import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BillingSettingsComponent } from './billing-settings.component';

describe('BillingSettingsComponent', () => {
    let component: BillingSettingsComponent;
    let fixture: ComponentFixture<BillingSettingsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [ BillingSettingsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillingSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
