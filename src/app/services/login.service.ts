import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.apiUrl;
  private currentUsrSrc = new ReplaySubject<User>(1);
  currentUser$ = this.currentUsrSrc.asObservable();
  error: string = null;

  constructor(private http: HttpClient) {}

  userLogin(model: any) {
    let params = new HttpParams();
    params = params.append('user_id', model.userid);
    params = params.append('password', model.password);

    return this.http
      .get<User>(this.baseUrl + 'users', { params: params })
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = 'Unable to connect to network. Please try after sometime.';
    }
    return throwError(errorMessage);
  }

  setCurrentUser(user: User) {
    this.currentUsrSrc.next(user);
  }
}
