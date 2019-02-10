import { Component, OnInit } from '@angular/core';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.less']
})
export class CompleteComponent implements OnInit {

  active = false;
  show = false;

  constructor(public state: StateService) {
    state.state.subscribe((_state) => {
      if (_state === State.Complete) {
        this.active = true;
        setTimeout(() => {
          this.show = true;
        }, 100);
      } else {
        this.show = false;
        setTimeout(() => {
          this.active = false;
        }, 1000);
      }
    });
  }

  ngOnInit() {
  }

}
