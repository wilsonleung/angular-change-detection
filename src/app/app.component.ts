import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { finalize, tap, take } from 'rxjs/operators';
import { UserService } from './users.service';

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

  constructor(private httpClient: HttpClient, private userSvc: UserService) {}

  ngOnInit(): void {
    this.subscription = this.subject
      .pipe(
        // first(), // this will cause the subscription ended
        finalize(() => {
          console.log('finalize');
        })
      )
      .subscribe((result) => {
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
    console.log('exit eventHandle ...');
  }

  timeoutHandle(loading: boolean) {
    setTimeout(() => {
      this.showLoading = loading;
    }, 50);
    console.log('exit timeoutHandle ...');
  }

  httpClientHandle(loading: boolean) {
    this.httpClient.get(API_URL).subscribe((response) => {
      console.log('[api response] ...', response);
      this.showLoading = loading;
    });
    console.log('exit httpClientHandle ...');
  }

  observableHandle(loading: boolean) {
    this.subject.next(loading);

    // this will cause the subscription ended
    // this.subject.complete();

    console.log('exit observableHandle ...');
  }

  observableFinalHandle(loading: boolean) {
    this.showLoading = true;
    this.userSvc
      .getUsers2()
      .pipe(
        tap((users) => {
          console.log('tap ...');
        }),
        finalize(() => {
          console.log('finalize...');
          this.showLoading = false;
        })
      )
      .subscribe((users) => {
        console.log('subscribe ...', users);
        // this.showLoading = false;
      });
  }
}
