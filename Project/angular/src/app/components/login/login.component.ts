import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../model/Login';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Message } from 'primeng/primeng';
import { Password } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  login: Login[];
  msgs: Message[];

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) {
    this.msgs = [];
   }

  ngOnInit() {
  }

  //Check if the user is registered
  userExists(username: string, password: string) {
    this.loginService.userExists(username, password).subscribe((p) => { //returns a observable, need to subscribe
      if (p.length == 0) {
        this.msgs.push({ severity: 'info', detail: 'No user found' })
      }
      else {
        this.login = p;
        this.cookieService.put('username', this.login[0].username);
        this.cookieService.put('id', this.login[0].Customer_id.toString());
        this.router.navigate(['/']);
        window.location.reload();
      }
    });
  }
}

