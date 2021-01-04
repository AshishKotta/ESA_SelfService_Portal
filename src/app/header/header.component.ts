import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public loginService: LoginService, private router: Router) {}
  isAdmin: boolean;

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((res) => {
      if (res) {
        this.isAdmin = res.role === 'Manager';
      }
    });
  }

  onLogOut() {
    this.loginService.userLogOut();
    this.router.navigateByUrl('/');
  }
}
