import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable()
export class SharedWishlist {
    private wishlist: Product[];

    constructor() {
        this.wishlist = [];
    }

    add(product: Product){
        if (!this.wishlist.find(item => item.id == product.id))
            this.wishlist.push(product);
    }

    getWishlist(){
        return this.wishlist;
    }

    clean(){
        this.wishlist = [];
    }
}