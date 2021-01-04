import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:3000/users/';
  private currentUsrSrc = new ReplaySubject<User>(1);
  currentUser$ = this.currentUsrSrc.asObservable();

  constructor(private http: HttpClient) {}

  userLogin(model: any) {
    let params = new HttpParams();
    params = params.append('user_id', model.userid);
    params = params.append('password', model.password);

    return this.http
      .get<User>(this.baseUrl, { params: params })
      .pipe(
        map((res: User) => {
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              this.currentUsrSrc.next(res[key]);
              localStorage.setItem('account', JSON.stringify(res[key]));
              return res[key] as User;
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  userLogOut() {
    localStorage.removeItem('account');
    this.currentUsrSrc.next(null);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = 'Invalid Username or Password.';
    return throwError(errorMsg);
  }

  setCurrentUser(user: User) {
    this.currentUsrSrc.next(user);
  }
}
