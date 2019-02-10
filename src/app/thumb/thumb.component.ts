import { Component, OnInit } from '@angular/core';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.less']
})
export class ThumbComponent implements OnInit {

  _status = false;
  failed = false;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.state.subscribe((state) => {
      this.failed = state === State.Failed;
    });
  }

  set status(value: boolean) {
    this._status = value;
    this.state.thumb(value);
  }

  get status() {
    return this._status;
  }

}
