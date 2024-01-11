import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

import { KeyboardComponent } from '@components/keyboard/keyboard.component';
import { DoorComponent } from '@components/door/door.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Door } from '@models/Door';

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
  public password = '12345678';
  public doors: Door[] = [
    { cols: 2, rows: 1, open: false, blocked: true, id: 1, main: true }
  ];
  private unSubscribe = new Subject<void>();

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ){}

  ngAfterViewChecked() {
    this.unlock();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  private checkPassword(): boolean {
    return this.displayValue === this.password;
  }

  private unlock(): void {
    if(this.checkPassword()) {
      this.doors[0].blocked = false
    } else {
      this.doors[0].open = false
      this.doors[0].blocked = true
    }
    this.ref.detectChanges();
  }

  public onKeyClicked(key: string): void {
    this.displayValue = key;
  }

  public openModal(): void {
    this.dialog
        .open(ModalComponent, { data: { title: 'Processo Finalizado', img: 'https://img.freepik.com/fotos-premium/gatinhos-fofos_421632-5997.jpg' } })
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
    this.router.navigate(['/1']);
  }
}
