import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';//import components of the ng model
import { HttpModule } from '@angular/http';//Import module to connect with webservices
import { RouterModule, Routes } from '@angular/router';//Import the route module to navegate the webpage
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataService } from './services/data.service'; //Import services module
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import { ProductService } from './services/product.service';
import {CustomerService} from './services/customer.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { MessagesModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';

import { MainComponent } from './components/main/main.component';
import { DepartmentComponent } from './components/department/department.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderLoginComponent } from './layout/header-login/header-login.component';
import { FooterLoginComponent } from './layout/footer-login/footer-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchComponent } from './components/search/search.component';

import { SharedData } from './shared/SharedData';
import { SharedCart } from './shared/SharedCart';
import { SharedWishlist } from './shared/SharedWishlist';

const appRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: MainComponent },
      { path: 'department/:departmentName', component: DepartmentComponent },
      { path: 'itemdetails/:productId', component: ItemdetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'edit', component: EditComponent },
      { path: 'search/:search', component: SearchComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: FooterComponent, outlet: 'footer' }
    ]
  },
  {
    path: '', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', component: HeaderLoginComponent, outlet: 'header' },
      { path: '', component: FooterLoginComponent, outlet: 'footer' }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DepartmentComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    SignupComponent,
    ItemdetailsComponent,
    CartComponent,
    WishlistComponent,
    EditComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MessagesModule,
    PasswordModule,
    GrowlModule,
    SlideMenuModule,
    SpinnerModule,
    MenubarModule
  ],
  providers: [DataService, MenuService, LoginService, ProductService, CustomerService,CookieService, SharedData, SharedWishlist, SharedCart], //Imported services
  bootstrap: [AppComponent]
})
export class AppModule { }
