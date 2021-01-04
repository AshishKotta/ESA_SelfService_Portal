import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.loginService.currentUser$.pipe(
      map((usr) => {
        if (usr) return true;
        this.toastr.error('This is not allowed to be done.');
      })
    );
  }
}
