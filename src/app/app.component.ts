import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Observer } from 'rxjs';

const API_URL = 'https://reqres.in/api/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showLoading = false;

  title = 'angular-change-detection';

  subject = new Subject<boolean>();
  subscription?: Subscription;
  // customObservable: Observable<boolean> = Observable.create(
  //   (observer: Observer<boolean>) => {
  //     setInterval(() => {
  //       observer.next(true);
  //     }, 50);
  //   }
  // );

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.subscription = this.subject.subscribe((result) => {
      console.log('subscription ...', result);
      this.showLoading = result;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startLoading(): void {
    console.log('[startLoading] ...');
    this.showLoading = true;
  }

  stopLoading(): void {
    console.log('[stopLoading] ...');
    this.showLoading = false;
  }

  startTimeout() {
    setTimeout(() => {
      this.showLoading = true;
    }, 50);
  }

  stopTimeout() {
    setTimeout(() => {
      this.showLoading = false;
    }, 50);
  }

  httpStart() {
    this.httpClient.get(API_URL).subscribe((response) => {
      console.log('[api response] ...', response);
      this.showLoading = true;
    });
  }

  httpStop() {
    this.httpClient.get(API_URL).subscribe((response) => {
      console.log('[api response] ...', response);
      this.showLoading = false;
    });
  }

  observableStart() {
    this.subject.next(true);
  }

  observableStop() {
    this.subject.next(false);
  }
}
