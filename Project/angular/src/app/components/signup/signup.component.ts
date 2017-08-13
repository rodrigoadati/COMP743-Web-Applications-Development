import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/Customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  customer: Customer;
  constructor() { }

  ngOnInit() {
  }

  createAccount(form: NgForm) {
    this.customer = form.value;
    console.log(this.customer.email);
    console.log(this.customer.firstName);
    console.log(this.customer.lastName);
    console.log(this.customer.password);
    // console.log("customer: " + this.customer);
  }

}
