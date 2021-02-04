import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdduserComponent } from '../admin/adduser/adduser.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedGuard implements CanDeactivate<unknown> {
  canDeactivate(component: AdduserComponent): boolean {
    if (component.userForm.touched || component.userForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost.'
      );
    }
    return true;
  }
}
