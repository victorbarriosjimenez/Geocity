import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},  
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: RegisterComponent },  
  { path: '**', component: NotFoundComponent }
 ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutesModule { }