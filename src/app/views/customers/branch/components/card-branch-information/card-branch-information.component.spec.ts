import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBranchInformationComponent } from './card-branch-information.component';

describe('CardBranchInformationComponent', () => {
  let component: CardBranchInformationComponent;
  let fixture: ComponentFixture<CardBranchInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBranchInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBranchInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
