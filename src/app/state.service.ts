import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const enum State {
  Waiting = 1,
  Preparing = 2,
  InProgress = 3,
  Failed = 4,
  Complete = 5,
}

export const COUNTDOWN = 3;
export const DURATION = 60;

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public state = new BehaviorSubject<State>(State.Waiting);
  public preparing = new BehaviorSubject<number>(-1);
  public progress = new BehaviorSubject<number>(-1);

  constructor() {
    this.state.subscribe((state) => {
      this.handlePreparing(state);
      this.handleInprogress(state);
    });
  }

  private prepareTimer: NodeJS.Timer;
  private progressTimer: NodeJS.Timer;
  private _recorder: any;

  // MAJOR STATE
  _face = false;
  _thumbs = 0;

  checkReadyToStart() {
    if (this._face && this._thumbs === 2) {
      if (this.state.getValue() === State.Waiting) {
        this.state.next(State.Preparing);
      }
    } else {
      if (this.state.getValue() === State.Preparing) {
        this.state.next(State.Failed);
        setTimeout(() => {
          this.state.next(State.Waiting);
        }, 100);
      } else if (this.state.getValue() === State.InProgress) {
        this.state.next(State.Failed);
        setTimeout(() => {
          this.state.next(State.Waiting);
        }, 100);
      }
    }
  }

  face(active: boolean) {
    this._face = active;
    this.checkReadyToStart();
  }

  thumb(active: boolean) {
    this._thumbs += active ? 1 : -1;
    this.checkReadyToStart();
  }

  // PREPARING STATE

  handlePreparing(state: State) {
    if (!state) {
      state = this.state.getValue();
    }
    if (state === State.Preparing) {
      if (this.preparing.getValue() === -1) {
        this.preparing.next(COUNTDOWN);
      } else if (this.preparing.getValue() === 1) {
        this.state.next(State.InProgress);
        return;
      } else {
        this.preparing.next(this.preparing.getValue() - 1);
      }
      this.prepareTimer = setTimeout(() => this.handlePreparing(null), 1000);
    } else {
      if (this.prepareTimer) {
        clearTimeout(this.prepareTimer);
        this.prepareTimer = null;
      }
      if (this.preparing.getValue() !== -1) {
        this.preparing.next(-1);
      }
    }
  }

  // INPROGRESS STATE
  handleInprogress(state: State) {
    if (!state) {
      state = this.state.getValue();
    }
    if (state === State.InProgress) {
      if (this.progress.getValue() === -1) {
        this.progress.next(DURATION);
      } else if (this.progress.getValue() === 1) {
        this.state.next(State.Complete);
        return;
      } else {
        this.progress.next(this.progress.getValue() - 1);
      }
      this.progressTimer = setTimeout(() => this.handleInprogress(null), 1000);
    } else {
      if (this.progressTimer) {
        clearTimeout(this.progressTimer);
        this.progressTimer = null;
      }
      if (this.progress.getValue() !== -1) {
        this.progress.next(-1);
      }
    }
  }

  // COMPLETE STATE
  setRecorder(recorder) {
    this._recorder = recorder;
  }

  save() {
    if (this._recorder) {
      this._recorder.save('video.webm');
      this._recorder = null;
    }
    if (this.state.getValue() === State.Complete) {
      this.state.next(State.Waiting);
    }
  }

  discard() {
    this._recorder = null;
    if (this.state.getValue() === State.Complete) {
      this.state.next(State.Waiting);
    }
  }

}
