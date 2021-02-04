import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  roles: Role[] = [];
  constructor(private _http: HttpClient) {}

  getUsers() {
    if (this.users.length > 0) return of(this.users);

    return this._http.get<User[]>(this.baseUrl + 'users').pipe(
      map((res) => {
        this.users = res;
        return this.users;
      }),
      catchError(this.handleError)
    );
  }

  getRoles() {
    if (this.roles.length > 0) return of(this.roles);
    return this._http.get<Role[]>(this.baseUrl + 'roles').pipe(
      map((res) => {
        this.roles = res;
        return this.roles;
      }),
      catchError(this.handleError)
    );
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
