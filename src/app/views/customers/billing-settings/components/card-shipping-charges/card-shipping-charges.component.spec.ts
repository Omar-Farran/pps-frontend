import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardShippingChargesComponent } from './card-shipping-charges.component';

describe('CardShippingChargesComponent', () => {
    let component: CardShippingChargesComponent;
    let fixture: ComponentFixture<CardShippingChargesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ CardShippingChargesComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardShippingChargesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});