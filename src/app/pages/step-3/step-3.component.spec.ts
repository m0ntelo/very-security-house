import { ComponentFixture, TestBed } from '@angular/core/testing';

import Step3Component from './step-3.component';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call unlock and detectChanges in ngAfterViewChecked()', () => {
    spyOn(component, 'unlock');
    spyOn(component['ref'], 'detectChanges');

    component.ngAfterViewChecked();

    expect(component.unlock).toHaveBeenCalled();
    expect(component['ref'].detectChanges).toHaveBeenCalled();
  });

  it('should call next and complete in ngOnDestroy()', () => {
    spyOn(component['unSubscribe'], 'next');
    spyOn(component['unSubscribe'], 'complete');

    component.ngOnDestroy();

    expect(component['unSubscribe'].next).toHaveBeenCalled();
    expect(component['unSubscribe'].complete).toHaveBeenCalled();
  });

  it('should return true when displayValue is equal to password', () => {
    component.displayValue = 'password123';  // Defina o valor esperado
    component.password = 'password123';

    const result = component.checkPassword;

    expect(result).toBe(true);
  });

  it('should return false when displayValue is not equal to password', () => {
    component.displayValue = 'password123';  // Defina o valor esperado
    component.password = 'differentPassword';

    const result = component.checkPassword;

    expect(result).toBe(false);
  });

  it('should update displayValue when onKeyClicked is called', () => {
    const key = 'A';

    component.onKeyClicked(key);

    expect(component.displayValue).toBe(key);
  });
});
