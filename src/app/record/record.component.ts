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
    if (this.container.nativeElement.requestFullscreen) {
      await this.container.nativeElement.requestFullscreen();
    } else if (this.container.nativeElement.webkitRequestFullScreen) {
      await this.container.nativeElement.webkitRequestFullScreen();
    }
    try {
      await screen.orientation.lock('portrait-primary');
    } catch {
      console.log('Failed to lock screen orientation');
    }
    this.fullscreen = true;
  }

}
