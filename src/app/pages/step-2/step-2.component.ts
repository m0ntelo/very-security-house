import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Door } from '@models/Door';
import { DoorComponent } from '@components/door/door.component';
import { DoorService } from '@core/service/door.service';
import { ModalComponent } from '@components/modal/modal.component';
import { mockStep2 } from '@shared/mock/all-step.mock';
import { contain, getIndexDoorMain } from '@shared/utils/functions';

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
  
  public doors: Door[] = mockStep2;
  private indexDoorMain: number = getIndexDoorMain(this.doors);
  private unSubscribe = new Subject<void>();

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private doorService: DoorService,
    private router: Router
  ) {}
  
  ngAfterViewChecked(): void {
    this.unlock();
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  public unlock(): void {
    if(contain(this.doors, 'open', true)) {
      this.doors[this.indexDoorMain].blocked = false
    } else {
      this.doors[this.indexDoorMain].open = false
      this.doors[this.indexDoorMain].blocked = true
    }
  }

  public openModal(): void {
    this.dialog
        .open(ModalComponent, { 
          data: { 
            title: 'Confirmar', 
            description: 'Você deseja avançar para próxima etapa?' 
          }
        })
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
