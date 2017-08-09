import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { Product } from '../model/Product';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService extends DataService {
    constructor(http: Http) {
        super(http);
    }
    
    getProducts(){
        return super.requestGET('products');
    }

    addProduct(product: Product):Observable<Product[]>{
        return super.requestPOST('products/add', product);
    }
}