import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardGeneralInformationComponent } from './card-general-information.component';

describe('CardGeneralInformationComponent', () => {
    let component: CardGeneralInformationComponent;
    let fixture: ComponentFixture<CardGeneralInformationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ CardGeneralInformationComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardGeneralInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});