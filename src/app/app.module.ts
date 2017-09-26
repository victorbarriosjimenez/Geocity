import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FormsService } from './shared/forms.service';
import { AuthenticationService } from './shared/authentication.service';


import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';

import { RoutesModule } from './routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent
],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    RoutesModule
  ],
  providers: [FormsService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
