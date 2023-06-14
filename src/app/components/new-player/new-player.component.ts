import { Component } from '@angular/core';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent {
  sliderValue: number = 0;

  onSliderChange(event: any) {
    this.sliderValue = Number(event.target.value);
  }
}