import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.loginService.userLogin(this.model).subscribe(
      (res: User) => {
        // for (let key in res) {
        //   if (res.hasOwnProperty(key)) {
        //     if (res[key].role === 'Manager') {
        //       console.log(res[key].role);
        //       this.router.navigateByUrl('/admin');
        //     } else {
        //     }
        //   }
        // }
        if (res) {
          if (res.role === 'Manager') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/allocations');
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
