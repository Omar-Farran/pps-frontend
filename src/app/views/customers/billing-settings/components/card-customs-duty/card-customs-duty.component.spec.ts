import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardCustomsDutyComponent } from './card-customs-duty.component';

describe('CardCustomsDutyComponent', () => {
    let component: CardCustomsDutyComponent;
    let fixture: ComponentFixture<CardCustomsDutyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ CardCustomsDutyComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardCustomsDutyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});