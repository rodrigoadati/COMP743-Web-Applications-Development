import { Component, OnInit } from '@angular/core';
import { SharedWishlist } from '../../shared/SharedWishlist';
import { SharedCart } from '../../shared/SharedCart';
import { Product } from '../../model/product';
import { Message } from 'primeng/primeng'; 

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {
    wishlists: Product[];
    product: Product;
    msgs: Message[];

    constructor(private sharedWishlist: SharedWishlist, private sharedCart: SharedCart) {this.msgs = []; }

    ngOnInit() {
        this.getWishlist();
    }

    getWishlist() {
        this.wishlists = this.sharedWishlist.getWishlist();
    }

    removeItem(id: number) {
        this.product = this.wishlists.find(item => item.id == id);
        var index = this.wishlists.indexOf(this.product);
        this.wishlists.splice(index, 1);
    }

    addToCart(id:number) {
        this.product = this.wishlists.find(item => item.id == id);
        this.sharedCart.add(this.product);
        this.msgs.push({ severity: 'info', detail: this.product.name + ' added to cart' })
    }

    isWishlistEmpty(){
        if(this.wishlists.length == 0)
            return true;
        else
            return false;
    }
}