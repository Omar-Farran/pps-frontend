import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardBillingProfilesComponent } from './card-billing-profiles.component';

describe('CardBillingProfilesComponent', () => {
    let component: CardBillingProfilesComponent;
    let fixture: ComponentFixture<CardBillingProfilesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ CardBillingProfilesComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardBillingProfilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});