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
  //   subject = new Subject<User[]>();
  subject = new BehaviorSubject<User[]>([]);
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<any>(API_URL).pipe(
      map((results) => {
        // console.log('result from user svc', results.data);
        return results.data;
      }),
      mergeMap((users) => {
        this.subject.next(users as User[]);
        return this.subject.asObservable();
      }),
      take(1)
    );
  }
}
