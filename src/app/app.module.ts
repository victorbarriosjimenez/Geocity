/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialElementsModule  } from './shared/material-elements.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';
import { GameplayModule } from './gameplay/gameplay.module';
import { TourMatMenuModule } from 'ngx-tour-md-menu/';

/* Services */
import { FormsService } from './shared/forms.service';
import { AuthenticationService } from './shared/authentication.service';


import { AuthGuard } from './shared/auth.guard';

/* Routes configuration */
import { RoutesModule } from './routes';

/* Components */ 
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './user/home/home.component';
import { UpdateComponent } from './user/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UpdateComponent
],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),  
    RouterModule,  
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialElementsModule,
    ReactiveFormsModule,
    UserModule,
    ForumModule,
    RoutesModule,
    GameplayModule,
    TourMatMenuModule.forRoot()
  ],
  providers: [
    FormsService,
    AuthenticationService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
