import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { FormsService } from './shared/forms.service';
import { AuthenticationService } from './shared/authentication.service';


import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';

import { RoutesModule } from './routes';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';
import { ListUserComponent } from './list-user/list-user.component';
import { WorldRankingComponent } from './world-ranking/world-ranking.component';
import { ForumComponent } from './forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ListUserComponent,
    WorldRankingComponent,
    ForumComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormsService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
