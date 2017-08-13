import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { Login } from '../model/Login';
import { Customer } from '../model/Customer';

@Injectable()
export class CustomerService extends DataService{
    constructor(http: Http){
        super(http);
    }

    createAccount(customer: Customer){
        return super.requestPOST('customer/createAccount', customer);
    }
}