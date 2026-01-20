import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Autosize } from './autosize.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, Autosize],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-autosize-demo';

  basicText = '';
  minHeightText = 'Try adding new lines…\nThis textarea has a min height.';
  maxHeightText = 'This one has a max height.\nKeep typing to see it start scrolling.';

  minHeight = 80;
  maxHeight = 180;

  setSample(autosize: Autosize): void {
    this.basicText = `Programmatically set at ${new Date().toLocaleTimeString()}\n\nLine 3\nLine 4`;
    autosize.refresh();
  }
}
