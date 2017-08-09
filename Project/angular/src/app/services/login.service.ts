import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { Login } from '../model/Login';

@Injectable()
export class LoginService extends DataService {
    constructor(http: Http) {
        super(http);
    }

    userExists(username: string, password: string) {
        return super.requestGET('login/' + username + '&' + password);
    }

    checkUser(login:Login){
        return super.requestPOST('checkUser', login);
    }
}