import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'; //Import module to connect with web services
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; //import MAP from react extension

@Injectable()
export class DataService {

  constructor(public http: Http) {
    console.log('data service connected - Dependency injection successful');
  }

  //Create the url path
  private createURL(url: string) {
    return 'http://slimapp/' + url;
  }

  protected requestGET(path: string) {
    return this.http.get(this.createURL(path))
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  protected requestPOST(path: string, object: Object) {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.createURL(path), object, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}

