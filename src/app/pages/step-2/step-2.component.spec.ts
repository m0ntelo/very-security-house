import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { of } from 'rxjs';

import Step2Component from './step-2.component';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [Step2Component],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
      ]
    })
    .compileComponents();
    
    matDialogSpy.open.and.returnValue(matDialogRefSpy);
    matDialogRefSpy.afterClosed.and.returnValue(of(true));

    fixture = TestBed.createComponent(Step2Component);
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

  it('should open the modal with correct data and log the result', () => {
    component.openModal();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ModalComponent, {
      data: { title: 'Confirmar', description: 'Você deseja avançar para próxima etapa?' }
    });

    expect(matDialogRefSpy.afterClosed).toHaveBeenCalled();
  });

  it('should unlock the door when contain returns true for open doors', () => {
    component['indexDoorMain'] = 0;
    component.doors = [
      { id: 1, open: false, blocked: true, main: true },
      { id: 2, open: true, blocked: false, main: false },
      { id: 3, open: true, blocked: false, main: false },
      { id: 4, open: true, blocked: false, main: false },
    ];

    component.unlock();

    expect(component.doors[0].blocked).toBeFalse();
  });

  it('should close and block the door when contain returns false for open doors', () => {
    component['indexDoorMain'] = 0;
    component.doors = [
      { id: 1, open: false, blocked: true, main: true },
      { id: 2, open: false, blocked: false, main: false },
      { id: 3, open: false, blocked: false, main: false },
      { id: 4, open: false, blocked: false, main: false },
    ];

    component.unlock();

    expect(component.doors[0].blocked).toBeTrue();
  });
});
