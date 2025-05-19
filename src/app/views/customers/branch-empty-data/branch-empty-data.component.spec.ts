import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchEmptyDataComponent } from './branch-empty-data.component';

describe('BranchEmptyDataComponent', () => {
  let component: BranchEmptyDataComponent;
  let fixture: ComponentFixture<BranchEmptyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchEmptyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchEmptyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
