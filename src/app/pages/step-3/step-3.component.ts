import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { DoorComponent } from '@components/door/door.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Door } from '@models/Door';
import { mockStep3 } from '@shared/mock/all-step.mock';
import { getIndexDoorMain } from '@shared/utils/functions';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [
    KeyboardComponent,
    DoorComponent,
    MatButtonModule
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export default class Step3Component implements AfterViewChecked {

  public displayValue: string = '';
  public password = '28091998';
  public doors: Door[] = mockStep3;
  private indexDoorMain: number = getIndexDoorMain(this.doors);
  private unSubscribe = new Subject<void>();

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ){}

  ngAfterViewChecked(): void {
    this.unlock();
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  public get checkPassword(): boolean {
    return this.displayValue === this.password;
  }

  public unlock(): void {
    if(this.checkPassword) {
      this.doors[this.indexDoorMain].blocked = false
    } else {
      this.doors[this.indexDoorMain].open = false
      this.doors[this.indexDoorMain].blocked = true
    }
  }

  public onKeyClicked(key: string): void {
    this.displayValue = key;
  }

  public openModal(): void {
    this.dialog
        .open(ModalComponent, { 
          data: { 
            title: 'Processo Finalizado', 
            img: 'https://img.freepik.com/fotos-premium/gatinhos-fofos_421632-5997.jpg' 
          }
        })
        .afterClosed()
        .pipe(takeUntil(this.unSubscribe))
        .subscribe(
          (req) => {
            if (req) {
              console.log(req)
            }
          }
        );
  }

  public restart(): void {
    location.reload();
    this.router.navigate(['1']);
  }
}
