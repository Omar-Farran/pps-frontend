import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingComponent } from './event-mapping.component';

describe('EventMappingComponent', () => {
  let component: EventMappingComponent;
  let fixture: ComponentFixture<EventMappingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
