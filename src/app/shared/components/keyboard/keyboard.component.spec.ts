import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';
import { EventEmitter } from '@angular/core';

describe('Keyboard2Component', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update currentInput and emit keyClicked event when key is clicked', () => {
    const spy = jasmine.createSpy();
    component.keyClicked = new EventEmitter();

    component.keyClicked.subscribe(spy);
    component.onKeyClick('1');

    expect(component.currentInput).toBe('1');
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should not update currentInput or emit keyClicked event if currentInput length is 8', () => {
    const spy = jasmine.createSpy();
    component.keyClicked = new EventEmitter();
    component.currentInput = '12345678';

    component.keyClicked.subscribe(spy);
    component.onKeyClick('9');

    expect(component.currentInput).toBe('12345678');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update currentInput and emit keyClicked event when onDeleteClick is called', () => {
    const spy = jasmine.createSpy();
    component.keyClicked = new EventEmitter();
    component.currentInput = '123';

    component.keyClicked.subscribe(spy);
    component.onDeleteClick();

    expect(component.currentInput).toBe('12');
    expect(spy).toHaveBeenCalledWith('12');
  });

  it('should not update currentInput or emit keyClicked event if currentInput length is 0', () => {
    const spy = jasmine.createSpy();
    component.keyClicked = new EventEmitter();

    component.keyClicked.subscribe(spy);
    component.onDeleteClick();

    expect(component.currentInput).toBe('');
    expect(spy).not.toHaveBeenCalled();
  });
});
