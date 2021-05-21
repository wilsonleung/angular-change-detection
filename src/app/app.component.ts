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

  eventHandle(loading: boolean) {
    this.showLoading = loading;
  }

  timeoutHandle(loading: boolean) {
    setTimeout(() => {
      this.showLoading = loading;
    }, 50);
  }

  httpClientHandle(loading: boolean) {
    this.httpClient.get(API_URL).subscribe((response) => {
      console.log('[api response] ...', response);
      this.showLoading = loading;
    });
  }

  observableHandle(loading: boolean) {
    this.subject.next(loading);
  }
}
