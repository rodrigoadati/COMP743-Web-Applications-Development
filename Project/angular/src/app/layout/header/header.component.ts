import { Component, OnInit } from '@angular/core';
import { MenuService } from './../../services/menu.service'; //Imported service module
import { Menu } from './../../model/Menu';
import { CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menus: Menu[];
  username:string;

  constructor(private menuService: MenuService, private cookieService:CookieService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe((m) => {
      console.log('webservice: requesting menu items...');
      this.menus = m;
      console.log(m);
    });

    this.username = this.cookieService.get('username') != null ? 'Welcome, ' + this.cookieService.get('username'): 'Sign In';
  }
}
