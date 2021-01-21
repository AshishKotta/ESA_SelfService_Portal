import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  @ViewChild('userForm', { static: false }) userForm: NgForm;
  roles: Role[];
  user: User = {
    id: null,
    user_id: null,
    password: null,
    first_name: null,
    last_name: null,
    role: null,
    created_dt: new Date(),
  };
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  saveUser(userdata: User) {
    this.adminService.saveUser(userdata).subscribe((res) => {
      this.userForm.reset();
      this.toastr.success('Employee added successfully');
      this.router.navigate(['/admin']);
    });
  }
}
