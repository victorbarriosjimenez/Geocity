/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Services */
import { FormsService } from './shared/forms.service';
import { AuthenticationService } from './shared/authentication.service';
import { UserService } from './shared/user.service';
import { CustomHttp } from './shared/custom-http.service';

/* Routes configuration */
import { RoutesModule } from './routes';

/* Components */ 
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from '../environments/environment';
import { ListUserComponent } from './list-user/list-user.component';
import { WorldRankingComponent } from './world-ranking/world-ranking.component';
import { ForumComponent } from './forum/forum.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ListUserComponent,
    WorldRankingComponent,
    ForumComponent,
    AlertComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FormsService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
