import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

import { Door } from '@models/Door';
import { DoorComponent } from '@components/door/door.component';
import { DoorService } from '@core/service/door.service';
import { ModalComponent } from '@components/modal/modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    DoorComponent
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export default class Step2Component implements AfterViewChecked, OnDestroy {
  
  private unSubscribe = new Subject<void>();
  public doors: Door[] = [
    { cols: 2, rows: 1, open: false, blocked: false, id: 1, main: false },
    { cols: 2, rows: 1, open: false, blocked: false, id: 2, main: false },
    { cols: 2, rows: 1, open: false, blocked: true, id: 3, main: true },
    { cols: 2, rows: 1, open: false, blocked: false, id: 4, main: false },
    { cols: 2, rows: 1, open: false, blocked: false, id: 5, main: false }
  ];

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private doorService: DoorService,
    private router: Router
  ) {}
  
  ngAfterViewChecked(): void {
    this.unlock();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  private contain(arr: any, key: string, val: boolean): boolean {
    let aux = [];
    for (let i = 0; i < arr.length; i++) { 
      if (arr[i][key] === val && arr[i]['main'] === !val) {
        aux.push(arr[i].id);
      } 
    }
    
    return (aux.length >= (arr.length) - 1);
  }

  private unlock(): void {
    if(this.contain(this.doors, 'open', true)) {
      this.doors[2].blocked = false
    } else {
      this.doors[2].open = false
      this.doors[2].blocked = true
    }
    this.ref.detectChanges();
  }

  public openModal(): void {
    this.dialog
        .open(ModalComponent, { data: { title: 'Confirmar', description: 'Você deseja avançar para próxima etapa?'} })
        .afterClosed()
        .pipe(takeUntil(this.unSubscribe))
        .subscribe(
          (req) => {
            if (req) {
              this.redirectRouter();
            }
          }
        );
  }

  private redirectRouter(): void {
    const url = Number(this.router.url.replace('/', '')) + 1;
    this.doorService.router[url].access = true;
    this.router.navigate([url]);
  }
}
