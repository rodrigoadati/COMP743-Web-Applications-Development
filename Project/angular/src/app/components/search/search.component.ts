import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model/Product';
import { ProductService } from '../../services/product.service';
import { SharedCart } from '../../shared/SharedCart';
import { SharedWishlist } from '../../shared/SharedWishlist';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    search: string;
    products: Product[] = [];
    product: Product;
    msgs: Message[] = [];

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private sharedCart: SharedCart, private sharedWishlist: SharedWishlist) {

    }

    ngOnInit() {
        this.getDepartmentName();
        this.getProductList();
    }

    //Get the name of the selected department
    private getDepartmentName() {
        this.activatedRoute.params.subscribe((param: Params) => {//This event will be fired every time the parameter value changes
            this.search = param['search'];
        });
    }

    //Get the list of products
    private getProductList() {
        this.activatedRoute.params.subscribe((param: Params) => {
            this.productService.getProductSearch(this.search).subscribe((p) => {
                this.products = p;
            });
        });
    }

    //Added the selected product to cart
    addToCart(id: number) {
        this.product = this.products.find(item => item.id == id);
        this.sharedCart.add(this.product);
        this.msgs.push({ severity: 'info', detail: this.product.name + ' added to cart' })
    }

    //Added the selected product to wishlist
    addToWishlist(id: number) {
        this.product = this.products.find(item => item.id == id);
        this.sharedWishlist.add(this.product);
        this.msgs.push({ severity: 'info', detail: this.product.name + ' added to wishlist' })
    }

    //Check if the product list is empty
    isProductEmpty(){
        if(this.products.length == 0)
            return true;
        else
            return false;
    }
}

