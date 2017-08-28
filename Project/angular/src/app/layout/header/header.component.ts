import { Component, OnInit } from '@angular/core';
import { MenuService } from './../../services/menu.service'; //Imported service module
import { Menu } from './../../model/Menu';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { SlideMenuModule, MenuItem } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { SharedCart } from './../../shared/SharedCart';
import { SharedWishlist } from './../../shared/SharedWishlist';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  menus: Menu[];
  username: string;
  items: MenuItem[];

  constructor(private router: Router, private menuService: MenuService, private cookieService: CookieService, private sharedCart:SharedCart, private sharedWishlist:SharedWishlist) { }

  ngOnInit() {
    this.getMenu();

    this.setMenuItem();

    this.username = this.cookieService.get('username') != null ? 'Welcome, ' + this.cookieService.get('username') : 'Sign In';
  }

  //Get menu from database
  getMenu() {
    this.menuService.getMenus().subscribe((m) => {
      this.menus = m;
    });
  }

  //Redirects the user to the selected page
  private redirectTo(page: string): void {
    if (this.cookieService.get('username') == null)
      this.router.navigate(['login']);
    else {
      this.router.navigate([page]);
    }
  }

  //Set the menu items for the logged in user 
  private setMenuItem(){
    this.items = [
      {
        label: 'My Account',
        icon: 'fa-edit',
        command:(click)=>{this.router.navigate(['/edit'])}
      },
      {
        label: 'Logout', 
        icon: 'fa-minus',
        command:(click)=>{this.clearUserData()}
      }
    ];
  }

  //clear user information
  clearUserData(){
    this.cookieService.removeAll();
    this.sharedCart.clean();
    this.sharedWishlist.clean();
    window.location.reload();
  }

  isLogged(): boolean{
    if(this.cookieService.get('username') == null){
      return false;
    }
    else{
      return true;
    }
  }

  redirectToSearch(search:string){
    this.router.navigate(['search/' + search]);
  }
}
