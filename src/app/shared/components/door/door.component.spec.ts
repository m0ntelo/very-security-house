import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorComponent } from './door.component';
import { EventEmitter } from '@angular/core';

describe('DoorComponent', () => {
  let component: DoorComponent;
  let fixture: ComponentFixture<DoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the next event', () => {
    const spy = jasmine.createSpy();
    component.next = new EventEmitter();
    component.next.subscribe(spy);

    component.nextStep();

    expect(spy).toHaveBeenCalled();
  });
});
