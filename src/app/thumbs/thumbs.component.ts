import { Component, OnInit } from '@angular/core';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-thumbs',
  templateUrl: './thumbs.component.html',
  styleUrls: ['./thumbs.component.less']
})
export class ThumbsComponent implements OnInit {

  active = false;

  constructor(private state: StateService) {
    state.state.subscribe((_state) => {
      this.active = _state !== State.Complete;
    });
  }

  ngOnInit() {
  }

}
