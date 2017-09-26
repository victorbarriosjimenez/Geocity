import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FormsService } from './forms.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';

import { RoutesModule } from './routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent
],
  imports: [
    BrowserModule, 
    HttpModule,
    RoutesModule
  ],
  providers: [FormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
