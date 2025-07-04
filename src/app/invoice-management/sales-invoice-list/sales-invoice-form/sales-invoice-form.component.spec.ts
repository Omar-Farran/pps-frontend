import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceFormComponent } from './sales-invoice-form.component';

describe('SalesInvoiceFormComponent', () => {
  let component: SalesInvoiceFormComponent;
  let fixture: ComponentFixture<SalesInvoiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesInvoiceFormComponent]
    });
    fixture = TestBed.createComponent(SalesInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
