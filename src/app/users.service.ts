import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}

const API_URL = 'https://reqres.in/api/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    //   subject = new Subject<User[]>();
    const subject = new BehaviorSubject<User[]>([]);
    return this.httpClient.get<any>(API_URL).pipe(
      map((results) => {
        // console.log('result from user svc', results.data);
        return results.data;
      }),
      mergeMap((users) => {
        subject.next(users as User[]);
        return subject.asObservable();
      }),
      take(1)
    );
  }

  getUsers2(): Observable<User[]> {
    return this.httpClient.get<any>(API_URL).pipe(
      map((results) => {
        // console.log('result from user svc', results.data);
        return results.data;
      }),
      mergeMap((users) => {
        return new Observable<User[]>((observer) => {
          return observer.next(users);
        });
      }),
      take(1)
    );
  }
}
