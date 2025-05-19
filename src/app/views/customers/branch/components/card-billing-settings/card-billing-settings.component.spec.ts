import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardBillingSettingsComponent } from './card-billing-settings.component';

describe('CardBillingSettingsComponent', () => {
    let component: CardBillingSettingsComponent;
    let fixture: ComponentFixture<CardBillingSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ CardBillingSettingsComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(CardBillingSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});