import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'register' } },
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