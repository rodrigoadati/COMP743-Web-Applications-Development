import { Component, OnInit, Input } from '@angular/core';
import { SharedCart } from '../../shared/SharedCart';
import { Product } from '../../model/Product';
import { Order } from '../../model/Order';
import { Result } from '../../model/result';
import { ProductService } from '../../services/product.service';
import { SpinnerModule } from 'primeng/primeng';
import { DoCheck, KeyValueDiffers } from '@angular/core';
import { Message } from 'primeng/primeng';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, DoCheck {
    product: Product;
    total: number;
    differ: any;
    order: Order;
    result: Result;
    msgs: Message[] = [];
    @Input() carts: Product[];

    constructor(private sharedCart: SharedCart, private iterableDiffers: KeyValueDiffers, private productService: ProductService, private cookieService: CookieService, private router: Router) {
        this.total = 0;
        this.order = new Order;
        this.result = new Result;
    }

    ngDoCheck() {
        this.carts.forEach(elt => {
            var objDiffer = this.differ[elt.id];
            var objChanges = objDiffer.diff(elt);
            if (objChanges) {
                objChanges.forEachChangedItem((elt) => {
                    //console.log('Item changed');
                    this.total = this.getTotal();
                });
            }
        });
    }

    ngOnInit() {
        this.setCart();
        this.differ = {};
        this.carts.forEach((elt) => {
            this.differ[elt.id] = this.iterableDiffers.find(elt).create(null);
        });
        this.total = this.getTotal();
    }

    setCart() {
        this.carts = this.sharedCart.getCart();
    }

    removeItem(id: number) {
        this.product = this.carts.find(item => item.id == id);
        var index = this.carts.indexOf(this.product);
        this.carts.splice(index, 1);
        this.total = this.getTotal(); //Update the total value
    }

    isCartEmpty() {
        if (this.carts.length == 0)
            return true;
        else
            return false;
    }

    //Calculates the total value of the cart
    getTotal() {
        //Initialize the variable
        this.total = 0;

        //Loop the list to get the total value
        for (let product of this.carts) {
            this.total = this.total + (product.price * product.number_of_item);
        }

        return this.total;
    }


    finalizePurchase() {
        this.order.Customer_id = +this.cookieService.get('id');
        this.order.status = 'Order Completed';
        this.order.total = this.total;

        this.productService.addOrder(this.order).subscribe((p) => {
            this.result = p;
        });


        this.showMessageSuccess('Purchase concluded');
        this.sharedCart.clean();
        setTimeout(() => this.changePage(), 2000);
    }

    showMessageError(message: string) {
        this.msgs.push({ severity: 'error', detail: message });
    }

    showMessageSuccess(message: string) {
        this.msgs.push({ severity: 'success', detail: message });
    }

    changePage() {
        this.router.navigate(['/']);
    }
}