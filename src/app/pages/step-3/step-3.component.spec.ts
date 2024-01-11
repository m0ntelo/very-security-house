import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { of } from 'rxjs';

import Step3Component from './step-3.component';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [Step3Component],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    })
    .compileComponents();
    
    matDialogSpy.open.and.returnValue(matDialogRefSpy);
    matDialogRefSpy.afterClosed.and.returnValue(of(true));
    
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

  it('should unlock the door when checkPassword is true', () => {
    component.displayValue = '28091998';
    component['indexDoorMain'] = 0;
    component.doors = [{ id: 1, open: true, blocked: true }];

    component.unlock();

    expect(component.doors[0].blocked).toBeFalsy();
  });

  it('should close and block the door when checkPassword is false', () => {
    component.displayValue = '12345678';
    component['indexDoorMain'] = 0;
    component.doors = [{ id: 1, open: true, blocked: false }];

    component.unlock();

    expect(component.doors[0].open).toBeFalsy();
    expect(component.doors[0].blocked).toBeTruthy();
  });

  it('should open the modal with correct data and log the result', () => {
    component.openModal();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ModalComponent, {
      data: { title: 'Processo Finalizado', img: 'https://img.freepik.com/fotos-premium/gatinhos-fofos_421632-5997.jpg' }
    });

    expect(matDialogRefSpy.afterClosed).toHaveBeenCalled();
  });
});
