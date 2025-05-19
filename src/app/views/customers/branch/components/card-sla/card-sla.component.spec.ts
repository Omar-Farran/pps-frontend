import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSlaComponent } from './card-sla.component';

describe('CardSlaComponent', () => {
  let component: CardSlaComponent;
  let fixture: ComponentFixture<CardSlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSlaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
