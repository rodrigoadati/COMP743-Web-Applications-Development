import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; //Imported service module
import { Product } from  '../../model/Product';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  //Declaration of variables and objects
  products: Product[];
  bestSellers: Product[];
  topCategories: Product[];   

  //Dependency injection in the constructor
  constructor(private productService:ProductService ) 
  { 
    
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((p)=> { //returns a observable, need to subscribe
      console.log(this.products);
      this.products = p;
      this.bestSellers = p;
      this.topCategories = p;
    }); 
  }
}

