import { Component } from '@angular/core';
import { KeyboardComponent } from '@components/keyboard/keyboard.component';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [
    KeyboardComponent
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export default class Step3Component {
  public displayValue: string = 'Password';

  public onKeyClicked(key: string): void {
    this.displayValue = key;
  }
}
