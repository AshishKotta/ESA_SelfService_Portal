import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ESAProject';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.setLoggedInUser();
  }

  setLoggedInUser() {
    const user: User = JSON.parse(localStorage.getItem('account'));
    this.loginService.setCurrentUser(user);
  }
}
