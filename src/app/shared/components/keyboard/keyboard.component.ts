import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule
  ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  public numericKeys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  public currentInput: string = '';

  @Output() keyClicked: EventEmitter<string> = new EventEmitter<string>();

  public onKeyClick(key: string): void {
    if (this.currentInput.length < 8) {
      this.currentInput += key;
      this.keyClicked.emit(this.currentInput);
    }
  }

  public onDeleteClick(): void {
    if (this.currentInput.length > 0) {
      this.currentInput = this.currentInput.slice(0, -1);
      this.keyClicked.emit(this.currentInput);
    }
  }

  public onConfirmClick(): void {

  }
}
