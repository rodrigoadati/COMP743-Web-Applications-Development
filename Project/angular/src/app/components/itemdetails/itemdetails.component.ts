import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model/Product';
import { Message } from 'primeng/primeng'; 
import { SharedData } from '../../shared/SharedData';
import { SharedWishlist } from '../../shared/SharedWishlist';
import { SharedCart } from '../../shared/SharedCart';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
})
export class ItemdetailsComponent implements OnInit {
  product: Product;
  id: number;
  msgs: Message[];

  constructor(private activatedRoute: ActivatedRoute, private data: SharedData, private sharedCart:SharedCart, private sharedWishlist:SharedWishlist) {
    this.msgs = [];
   }

  ngOnInit() {
    this.getProductId();
    this.getProductDetail();
  }

  //Get the detail of the selected item
  private getProductDetail() {
    this.product = this.data.storage.filter(item => item.id === this.id)[0];    
  }

  //get the ID of the product
  private getProductId() {
    this.activatedRoute.params.subscribe((param: Params) => {//This event will be fired every time the parameter value changes
      this.id = param['productId'];
    });
  }

  //Add the selected item to cart
  addToCart(){
    console.log('added item to cart');
    this.sharedCart.add(this.product);
    this.msgs.push({ severity: 'info', detail: this.product.name + ' added to cart' })
  }

  //Add the selected item to wishlist
  addToWishlist(){
    console.log('added item to wishlist');
    this.sharedWishlist.add(this.product);
    this.msgs.push({ severity: 'info', detail: this.product.name + ' added to wishlist' })
  }

  isGame(): boolean{
    if(this.product.Category_id == 2)
      return true;
    else 
      return false;
  }

  isAvailable(){
    if(this.product.price > 0)
      return true;
    else
      return false;
  }
}
