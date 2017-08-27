import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/Product';
import { SharedData } from '../../shared/SharedData';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
  departmentProducts: Product[];
  departmentName: string;
  isDepartment: boolean = true;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private data:SharedData) { }

  ngOnInit() {
    this.getDepartmentName();
    this.getProductByDepartment();
  }

  //Get products based on the category and department
  getCategoryProducts(category: string) {
    this.productService.getCategoryProducts(category, this.departmentName).subscribe((p) => {
      this.departmentProducts = p;
      this.data.storage = p;
    });
  }

  //Get the name of the selected department
  private getDepartmentName() {
    this.activatedRoute.params.subscribe((param: Params) => {//This event will be fired every time the parameter value changes
      this.departmentName = param['departmentName'];
    });
  }

  //Get products based on the department
  private getProductByDepartment() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.productService.getProductByDepartment(this.departmentName).subscribe((p) => {
        this.departmentProducts = p;
        this.data.storage = p;
      });
    });
  }
}
