import { Component, OnInit } from '@angular/core';
import { Signup } from '../../model/Signup';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Result } from '../../model/result';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  customer: Signup;
  msgs: Message[] = [];
  result: Result;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
  }

  createAccount(form: NgForm) {
    this.customer = form.value;
    var isPasswordValid = this.isPasswordSame(this.customer.password, this.customer.cpassword);
    var isFieldEmpty = this.isFieldEmpty(this.customer);

    if (isPasswordValid && isFieldEmpty) {
      this.executeService();
    }
  }

  isPasswordSame(password: string, confirm_password: string) {
    if ((password != confirm_password) &&
      password != "" &&
      confirm_password != "") {
      this.showMessageError("Password does not match");
      return false;
    }
    return true;
  }

  isFieldEmpty(customer: Signup) {
    if (customer.first_name == "" || customer.last_name == "" || customer.email == "" || customer.username == "") {
      this.showMessageError('Fields should not be empty');
      return false;
    }

    return true;
  }

  showMessageError(message: string) {
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }

  showMessageSuccess(message: string) {
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: message });
  }

  executeService() {
    this.customerService.createAccount(this.customer).subscribe((p) => {
      this.result = p;

      if (this.result.code == 0) {
        this.showMessageSuccess(this.result.text);
        setTimeout(()=>this.changePage(), 2000);
      }
      else {
        this.showMessageError(this.result.text);
      }
    });
  }

  changePage(){
    this.router.navigate(['login']);
  }
}