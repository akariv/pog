import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-preparing',
  templateUrl: './preparing.component.html',
  styleUrls: ['./preparing.component.less']
})
export class PreparingComponent implements OnInit {

  countdown = 0;
  active = false;
  show = false;

  constructor(private state: StateService) {
  }

  ngOnInit() {
    this.state.preparing.subscribe((countdown) => {
      this.countdown = countdown;
      this.active = countdown >= 0;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 100);
    });
  }

}
