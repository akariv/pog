import { Component, OnInit } from '@angular/core';
import { StateService, DURATION } from '../state.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.less']
})
export class ProgressComponent implements OnInit {

  countdown = 0;
  active = false;
  show = false;
  DURATION = DURATION;

  constructor(private state: StateService) {}

  ngOnInit() {
    this.state.progress.subscribe((countdown) => {
      if (countdown % 2) {
        navigator.vibrate([20, 20, 20]);
      }
      this.countdown = countdown;
      this.active = countdown >= 0;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 100);
    });
  }

}
