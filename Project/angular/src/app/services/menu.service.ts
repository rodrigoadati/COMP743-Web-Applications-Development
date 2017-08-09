
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class MenuService extends DataService {
    constructor(http: Http) {
        super(http);
    }

    getMenus() {
        return super.requestGET('menus');
    }
}