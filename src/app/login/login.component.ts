import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {};

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    const token: any = this.authService.login(this.user);
    if (token.acess_token) {
      this.router.navigate(['/admin']);
    } else {
      console.log(token.message);
    }
  }

}
