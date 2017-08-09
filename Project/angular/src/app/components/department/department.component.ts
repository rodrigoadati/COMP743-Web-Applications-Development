import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from  '../../model/Product';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  //Declaration of variables and objects
  features: Product[];
  bestSellers: Product[];
  topCategories: Product[]; 
  departments: Product[];  
  departmentName:string;
  isDepartment:boolean = true;

  constructor(private productService:ProductService, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.departmentName = param['departmentName'];
    });

    this.productService.getProducts().subscribe((p)=> { //returns a observable, need to subscribe
      this.features = p;
      this.bestSellers = p;
      this.topCategories = p;
      this.departments = p;
    }); 
  }
}
