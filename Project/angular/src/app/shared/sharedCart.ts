import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

export class SharedCart {
    private cart: Product[];
    private total: number = 0;

    constructor() {
        this.cart = [];
    }

    add(product: Product) {
        if (!this.cart.find(item => item.id == product.id))
            this.cart.push(product);
    }

    getCart(){
        return this.cart;
    }

    clean(){
        this.cart = [];
    }

    getTotal(){
       for(let product of this.cart){
           this.total = this.total + (product.price * product.number_of_item);
       }

       return this.total;
    }
}