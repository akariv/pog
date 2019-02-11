import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { detectSingleFace, FaceDetection, TinyFaceDetectorOptions, nets } from 'face-api.js';
import * as RecordRTC from 'recordrtc';
import { StateService, State } from '../state.service';

@Component({
  selector: 'app-facevideo',
  templateUrl: './facevideo.component.html',
  styleUrls: ['./facevideo.component.less']
})
export class FacevideoComponent implements OnInit {

  @ViewChild('inputVideo') inputVideo: ElementRef;

  status = false;
  failed = false;
  active = false;
  recording = false;
  videoStream: MediaStream;
  recordRTC: any;

  constructor(private state: StateService) {
    state.state.subscribe((_state) => {
      this.active = _state !== State.Complete;
      if (_state === State.InProgress && !this.recording) {
        this.startRecording();
        this.recording = true;
      }
      if (_state !== State.InProgress && this.recording) {
        this.recording = false;
        this.stopRecording();
        if (_state === State.Complete) {
          state.setRecorder(this.recordRTC);
        }
      }
    });
  }

  ngOnInit() {
    this.state.state.subscribe((state) => {
      this.failed = state === State.Failed;
      this.status = this.status && !this.failed;
    });
    this.init();
  }

  async init() {
    const videoEl = this.inputVideo.nativeElement;
    const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    const videoConstraints: any = {};
    const audioConstraints: any = {};
    if (supportedConstraints.facingMode) { videoConstraints.facingMode = 'user'; }
    if (supportedConstraints.height) { videoConstraints.height = videoEl.offsetWidth; }
    if (supportedConstraints.width) { videoConstraints.width = videoEl.offsetHeight; }
    if (supportedConstraints.echoCancellation) { audioConstraints.echoCancellation = true; }
    this.videoStream = await navigator.mediaDevices
      .getUserMedia({
        video: videoConstraints,
        audio: audioConstraints,
      });
    videoEl.srcObject = this.videoStream;
  }

  async onPlay() {
    const videoEl = this.inputVideo.nativeElement;
    const inputSize = 128;
    const scoreThreshold = 0.5;
    const options = new TinyFaceDetectorOptions({ inputSize, scoreThreshold });
    if (!nets.tinyFaceDetector.params) {
      await nets.tinyFaceDetector.load('/assets/');
    }
    const result = await detectSingleFace(videoEl, options);
    if (result) {
      this.status = true;
    } else {
      this.status = false;
    }
    this.state.face(this.status);
    setTimeout(() => this.onPlay(), 1000);
  }

  startRecording() {
    const videoOptions = {
      type: 'video',
      mimeType: 'video/webm',
      videoBitsPerSecond: 128000,
      audioBitsPerSecond: 64000,
      canvas: {width: 240, height: 320},
      video: {width: 240, height: 320},
    };
    this.recordRTC = RecordRTC(this.videoStream, videoOptions);
    this.recordRTC.startRecording();
  }

  stopRecording() {
    this.recordRTC.stopRecording();
  }
}
