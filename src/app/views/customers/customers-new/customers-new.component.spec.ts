import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomersNewComponent } from './customers-new.component';

describe('CustomersNewComponent', () => {
  let component: CustomersNewComponent;
  let fixture: ComponentFixture<CustomersNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
