import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http
      .get<User[]>(this.baseUrl + 'users')
      .pipe(catchError(this.handleError));
  }

  getRoles() {
    return this._http
      .get<Role[]>(this.baseUrl + 'roles')
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string) {
    return this._http
      .delete<User>(this.baseUrl + 'users/' + id)
      .pipe(catchError(this.handleError));
  }

  saveUser(user: User) {
    return this._http
      .post<User>(this.baseUrl + 'users/', user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
