import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://reqres.in/api/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoading = false;

  title = 'angular-change-detection';

  constructor(private httpClient: HttpClient) {}

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
}
