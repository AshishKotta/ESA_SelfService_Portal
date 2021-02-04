import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class AllocationsService {
  baseUrl = environment.apiUrl;
  reports: Report[] = [];
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  getAllocationReportDetails() {
    if (this.reports.length > 0) return of(this.reports);
    return this.http.get<Report[]>(this.baseUrl + 'reports').pipe(
      map((res) => {
        this.reports = res;
        return this.reports;
      }),
      catchError(this.handleError)
    );
  }

  getEmpAllocationDetails(reportname: string) {
    let params = new HttpParams();
    params = params.append('report_name', reportname);
    return this.http
      .get<Project[]>(this.baseUrl + 'projects', { params: params })
      .pipe(
        map((res) => {
          this.projects = res;
          return this.projects;
        }),
        catchError(this.handleError)
      );
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
