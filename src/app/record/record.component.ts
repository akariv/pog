import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  @ViewChild('container') container: ElementRef;
  fullscreen = false;

  constructor() { }

  ngOnInit() {
  }

  async clicked() {
    await this.container.nativeElement.requestFullscreen();
    await screen.orientation.lock('portrait-primary');
    this.fullscreen = true;
  }

}
