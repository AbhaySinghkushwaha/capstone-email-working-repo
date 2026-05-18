import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

<<<<<<< HEAD
=======
import { LandingComponent } from './landing/landing.component';

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WholesalerDashboardComponent } from './wholesaler-dashboard/wholesaler-dashboard.component';
import { CreateProductsComponent } from './create-products/create-products.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { GetOrdersComponent } from './get-orders/get-orders.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { ConsumerPlaceOrderComponent } from './consumer-place-order/consumer-place-order.component';
import { ConsumerGetOrdersComponent } from './consumer-get-orders/consumer-get-orders.component';
<<<<<<< HEAD

import { ManufacturerDashboardComponent } from './manufacturer-dashboard/manufacturer-dashboard.component';

=======
import { ManufacturerDashboardComponent } from './manufacturer-dashboard/manufacturer-dashboard.component';

// ADD THIS LINE
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashbaordComponent,
    CreateProductsComponent,
    PlaceOrderComponent,
    GetOrdersComponent,
    AddInventoryComponent,
    ConsumerPlaceOrderComponent,
    ConsumerGetOrdersComponent,
    WholesalerDashboardComponent,
<<<<<<< HEAD
    ManufacturerDashboardComponent
=======
    ManufacturerDashboardComponent,
    ConsumerDashboardComponent  ,
        LandingComponent
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
<<<<<<< HEAD
export class AppModule { }
=======
export class AppModule { }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
