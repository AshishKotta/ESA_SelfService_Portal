import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyReqCnt = 0;

  constructor(private spinner: NgxSpinnerService) {}

  busy() {
    this.busyReqCnt++;
    this.spinner.show(undefined, {
      type: 'ball-spin-clockwise',
      size: 'medium',
      bdColor: 'rgba(255,255,255,0)',
      color: '#007bff',
    });
  }

  idle() {
    this.busyReqCnt--;
    if (this.busyReqCnt <= 0) {
      this.busyReqCnt = 0;
      this.spinner.hide();
    }
  }
}
