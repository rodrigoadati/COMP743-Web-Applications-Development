import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service'; //Imported service module
import { Menu } from './model/Menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'COMP743 - Web Development';
  menus:Menu[];

  constructor(private menuService:MenuService){
    console.log('Webservice started at component module');
  }
  
  ngOnInit(){
    this.menuService.getMenus().subscribe((m)=> {
      console.log('webservice: requesting menu items...');
      this.menus = m;
    });
  }
}