import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; //Imported service module
import { Product } from  '../../model/Product';
import { SharedData } from '../../shared/SharedData';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})

export class MainComponent implements OnInit {
  products: Product[];
  bestSellers: Product[];
  topCategories: Product[];   

  constructor(private productService:ProductService, private data:SharedData ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((p)=> { //returns a observable, need to subscribe
      console.log(this.products);
      this.products = p;
      this.bestSellers = p;
      this.topCategories = p;
      this.data.storage= p;
    }); 
  }
}

