import { Component, OnInit } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { SharedCart } from './../../shared/SharedCart';
import { SharedWishlist } from './../../shared/SharedWishlist';
import { CustomerService } from '../../services/customer.service';
import { LoginService } from '../../services/login.service';
import { ProductService } from '../../services/product.service';
import { Customer } from '../../model/Customer';
import { Address } from '../../model/Address';
import { Order } from '../../model/Order';
import { Login } from '../../model/Login';
import { Result } from '../../model/result';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
    items: MenuItem[];
    customer: Customer = new Customer;
    address: Address = new Address;
    user: Login = new Login;
    orders: Order[] = [];
    result = new Result;
    id: number;
    isMyAccount: boolean;
    isMainAddress: boolean;
    isChangePassword: boolean;
    isMyOrder: boolean;
    msgs: Message[] = [];

    constructor(private router: Router,
                private cookieService: CookieService, 
                private sharedCart: SharedCart, 
                private sharedWishlist: SharedWishlist, 
                private customerService: CustomerService,
                private loginService:LoginService,
                private productService:ProductService) {
    }

    ngOnInit() {
        this.id = +this.cookieService.get('id');
        this.user.Customer_id = +this.cookieService.get('id');
        this.setMenu();
        this.openMenu("account"); //opens default menu
        this.getMyAccount(); //retrieve data for the account of the user
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
                command: (onclick) => { this.openMenu("account"); }
            },
            {
                label: 'Main Address',
                icon: 'fa fa-location-arrow',
                command: (onclick) => { this.openMenu("address"); }
            },
            {
                label: 'Change Password',
                icon: 'fa fa-lock',
                command: (onclick) => { this.openMenu("password"); }
            },
            {
                label: 'My Orders',
                icon: 'fa fa-list-alt',
                command: (onclick) => { this.openMenu("order"); }
            }
        ];
    }

    openMenu(menuItem: string) {
        console.log('entered open menu');
        this.isMyAccount = false;
        this.isMainAddress = false;
        this.isChangePassword = false;
        this.isMyOrder = false;

        if (menuItem == "account") {
            this.isMyAccount = true;
            this.getMyAccount();
        }
        else if (menuItem == "address") {
            this.isMainAddress = true;
            this.getMyAddress();
        }
        else if (menuItem == "password") {
            this.isChangePassword = true;
        }
        else if (menuItem == "order") {
            this.isMyOrder = true;
            this.getMyOrder();
        }
    }

    //Get the user information
    getMyAccount() {
        this.customerService.getCustomer(this.id).subscribe((p) => {
            console.log('customer: ' + p);
            this.customer = p[0];
        });
    }

    //Get the user address
    getMyAddress() {
        this.customerService.getAddress(this.id).subscribe((p) => {
            this.address = p[0];
        });
    }

    getMyOrder(){
        console.log('ID: ' + this.id);
        this.productService.getOrder(this.id).subscribe((p) => {
            this.orders = p;
        });
    }

    //Update user account information
    updateAccount() {
        this.customerService.updateCustomer(this.customer).subscribe((p) => {
            this.result = p;

            if (this.result.code == 0) {
                this.showMessageSuccess(this.result.text);
            }
            else {
                this.showMessageError(this.result.text);
            }
        });
    }

    //Update user address information
    updateAddress() {
        this.customerService.updateAddress(this.address).subscribe((p) => {
            this.result = p;

            if (this.result.code == 0) {
                this.showMessageSuccess(this.result.text);
            }
            else {
                this.showMessageError(this.result.text);
            }
        });
    }

    //Update user password information
    updatePassword() {
        if (this.isPasswordSame(this.user.password, this.user.cpassword)) {
            console.log('ID: ' + this.user.id);
            console.log('Password : ' + this.user.password);
            console.log('CustomerId: ' + this.user.Customer_id);
            this.loginService.changePassword(this.user).subscribe((p) => {
                this.result = p;

                if (this.result.code == 0) {
                    this.showMessageSuccess(this.result.text);
                }
                else {
                    this.showMessageError(this.result.text);
                }
            });
        }
    }

    //Check of the password matches
    isPasswordSame(password: string, confirm_password: string) {
        if ((password != confirm_password) &&
            password != "" &&
            confirm_password != "") {
            this.showMessageError("Password does not match");
            return false;
        }
        return true;
    }

    showMessageError(message: string) {
        this.msgs.push({ severity: 'error', detail: message });
    }

    showMessageSuccess(message: string) {
        this.msgs.push({ severity: 'success', detail: message });
    }
}