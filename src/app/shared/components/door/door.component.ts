import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Door } from '@models/Door';

@Component({
  selector: 'app-door',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './door.component.html',
  styleUrl: './door.component.scss'
})
export class DoorComponent {
  @Input() door: Door = {};
  @Output() next: EventEmitter<void> = new EventEmitter();
  
  constructor() {}

  public nextStep(): void {
    this.next.emit();
  }
}
