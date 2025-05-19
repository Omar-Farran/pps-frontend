import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomersProfileComponent } from './customers-profile.component';

describe('CustomersProfileComponent', () => {
  let component: CustomersProfileComponent;
  let fixture: ComponentFixture<CustomersProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
