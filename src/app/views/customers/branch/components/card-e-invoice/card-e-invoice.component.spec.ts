import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEInvoiceComponent } from './card-e-invoice.component';

describe('CardEInvoiceComponent', () => {
  let component: CardEInvoiceComponent;
  let fixture: ComponentFixture<CardEInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
