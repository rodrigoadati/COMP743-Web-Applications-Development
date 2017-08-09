import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';//import components of the ng model
import { HttpModule } from '@angular/http';//Import module to connect with webservices
import { RouterModule, Routes } from '@angular/router';//Import the route module to navegate the webpage
import { DataService } from './services/data.service'; //Import services module
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import { ProductService } from './services/product.service';
import { CookieService} from 'angular2-cookie/services/cookies.service';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import { MainComponent } from './components/main/main.component';
import { DepartmentComponent } from './components/department/department.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderLoginComponent } from './layout/header-login/header-login.component';
import { FooterLoginComponent } from './layout/footer-login/footer-login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ItemdetailsComponent } from './components/itemdetails/itemdetails.component';

const appRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: MainComponent },
      { path: 'department/:departmentName', component: DepartmentComponent },
      { path: 'itemdetails/:itemid', component: ItemdetailsComponent },
      { path: 'category', component: CategoryComponent },
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
    CategoryComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    SignupComponent,
    ItemdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [DataService, MenuService, LoginService, ProductService, CookieService], //Imported services
  bootstrap: [AppComponent]
})
export class AppModule { }
