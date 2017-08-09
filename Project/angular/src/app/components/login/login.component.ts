import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../model/Login';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;

  constructor(private loginService: LoginService, private router:Router, private cookieService:CookieService) { }

  ngOnInit() {
  }

  userExists(username: string, password: string) {
    this.loginService.userExists(username, password).subscribe((p) => { //returns a observable, need to subscribe
      this.login = p;
      if (p.length == 0) {
        console.log("user not found");
        //return false;
      }
      else {
        console.log('user exists');
        this.cookieService.put('username','Rodrigo');
        this.router.navigate(['/']);
        //return true;
      }
    });
  }
}

