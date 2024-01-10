import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

import { Door } from '@models/Door';
import { DoorComponent } from '@components/door/door.component';
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    DoorComponent,
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export default class Step1Component implements OnInit, AfterViewChecked {

  public doors: Door[] = [
    { cols: 6, rows: 1, open: false, blocked: true,  id: 1, main: true },
    { cols: 2, rows: 1, open: false, blocked: false, id: 2, main: false },
    { cols: 2, rows: 1, open: false, blocked: false, id: 3, main: false },
    { cols: 2, rows: 1, open: false, blocked: false, id: 4, main: false }
  ];

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  private contain(arr: any, key: string, val: boolean): boolean {
    let aux = [];
    for (let i = 0; i < arr.length; i++) { 
      if (arr[i][key] === val && arr[i]['main'] === !val) {
        aux.push(arr[i].id);
      } 
    }
    
    return (aux.length >= (arr.length) - 1);
  }
  
  ngAfterViewChecked(): void {
    this.unlock();
  }

  private unlock(): void {
    if(this.contain(this.doors, 'open', true)) {
      this.doors[0].blocked = false
    } else {
      this.doors[0].open = false
      this.doors[0].blocked = true
    }
    this.ref.detectChanges();
  }

  public openModal(): void {
    this.dialog
        .open(ModalComponent)
        .afterClosed()
        .subscribe(
          (req) => {
            console.log(req, 'req')
          }
        );
  }
}
