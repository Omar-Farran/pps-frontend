import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardCodChargesComponent } from './card-cod-charges.component';

describe('CardCodChargesComponent', () => {
    let component: CardCodChargesComponent;
    let fixture: ComponentFixture<CardCodChargesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ CardCodChargesComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardCodChargesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});