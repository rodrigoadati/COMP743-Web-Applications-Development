import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { Login } from '../model/Login';
import { Customer } from '../model/Customer';
import { Address } from '../model/Address';

@Injectable()
export class CustomerService extends DataService{
    constructor(http: Http){
        super(http);
    }

    createAccount(customer: Customer){
        return super.requestPOST('customer/createAccount', customer);
    }

    getCustomer(id:number){
        return super.requestGET('customer/' + id);
    }

    getAddress(id:number){
        return super.requestGET('customer/getAddress/' + id);
    }

    updateCustomer(customer:Customer){
        return super.requestPOST('customer/updateAccount', customer);
    }

    updateAddress(address:Address){
        return super.requestPOST('customer/updateAddress', address);
    }
}