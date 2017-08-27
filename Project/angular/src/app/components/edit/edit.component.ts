import { Component, OnInit } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { SharedCart } from './../../shared/SharedCart';
import { SharedWishlist } from './../../shared/SharedWishlist';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    items: MenuItem[];
    isMyAccount: boolean;
    isMainAddress: boolean;
    isChangePassword: boolean;
    isMyOrder: boolean;

    constructor(private router: Router, private cookieService: CookieService, private sharedCart: SharedCart, private sharedWishlist: SharedWishlist) {

    }

    ngOnInit() {
        this.setMenu();
        this.openMenu("account"); //opens default menu
    }

    logout() {
        window.location.reload();
        this.cookieService.removeAll();
        this.sharedCart.clean();
        this.sharedWishlist.clean();
        this.router.navigate(['/']);
    }

    setMenu() {
        this.items = [
            {
                label: 'My Account',
                icon: 'fa fa-user-circle-o',
                command: (onclick) => {this.openMenu("account");}
            },
            {
                label: 'Main Address',
                icon: 'fa fa-location-arrow',
                command: (onclick) => {this.openMenu("address");}
            },
            {
                label: 'Change Password',
                icon: 'fa fa-lock',
                command: (onclick) => {this.openMenu("password");}
            },
            {
                label: 'My Orders',
                icon: 'fa fa-list-alt',
                command: (onclick) => {this.openMenu("order");}
            }
        ];
    }

    openMenu(menuItem: string)  {
        console.log('entered open menu');
        this.isMyAccount = false;
        this.isMainAddress = false;
        this.isChangePassword = false;
        this.isMyOrder = false;

        if (menuItem == "account"){
            this.isMyAccount = true;
        }
        else if (menuItem == "address") {
            this.isMainAddress = true;
        }
        else if (menuItem == "password") {
            this.isChangePassword = true;
        }
        else if (menuItem == "order") {
            this.isMyOrder = true;
        }
    }
}