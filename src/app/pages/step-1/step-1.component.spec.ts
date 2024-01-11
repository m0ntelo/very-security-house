import { ComponentFixture, TestBed } from '@angular/core/testing';
import Step1Component from './step-1.component';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;
  
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Step1Component],
      providers: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next and complete in ngOnDestroy()', () => {
    spyOn(component['unSubscribe'], 'next');
    spyOn(component['unSubscribe'], 'complete');

    component.ngOnDestroy();

    expect(component['unSubscribe'].next).toHaveBeenCalled();
    expect(component['unSubscribe'].complete).toHaveBeenCalled();
  });

  it('should call unlock() and detectChanges() in ngAfterViewChecked()', () => {
    spyOn(component, 'unlock');
    spyOn(component['ref'], 'detectChanges');

    component.ngAfterViewChecked();

    expect(component.unlock).toHaveBeenCalled();
    expect(component['ref'].detectChanges).toHaveBeenCalled();
  });
});
