import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PersonComponent } from './components/person/person.component';
import { UserService } from './services/user.service';
import { FoodService } from './services/food.service';
import { LoginService } from './services/login.service';
import { PersonService } from './services/person.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FoodComponent } from './components/food/food.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PersonComponent,
    HomeComponent,
    LoginComponent,
    FoodComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [PersonService, UserService, FoodService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
