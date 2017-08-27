import {Component, OnInit} from '@angular/core';
import { SharedCart } from '../../shared/SharedCart';
import { Product } from '../../model/Product';
import {SpinnerModule} from 'primeng/primeng';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls:['./cart.component.css']
})

export class CartComponent implements OnInit{
    carts:Product[];
    product: Product;
    total:number;

    constructor(private sharedCart:SharedCart){this.total=0;}

    ngOnInit(){
        this.setCart();

        this.total = this.sharedCart.getTotal();
    }

    setCart(){
        this.carts = this.sharedCart.getCart();
    }

    removeItem(id:number){
        this.product = this.carts.find(item => item.id == id);
        var index = this.carts.indexOf(this.product);
        this.carts.splice(index, 1);
    }

    isCartEmpty(){
        if(this.carts.length == 0)
            return true;
        else
            return false;
    }


}