import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { AdminComponent } from './admin/admin.component';
import { AllocationComponent } from './allocation/allocation.component';
import { EditAllocationComponent } from './allocation/edit-allocation/edit-allocation.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedGuard } from './guards/prevent-unsaved.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'admin', component: AdminComponent },
      {
        path: 'admin/adduser',
        component: AdduserComponent,
        canDeactivate: [PreventUnsavedGuard],
      },
      { path: 'allocations', component: AllocationComponent },
      { path: 'allocations/:report_name', component: EditAllocationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
