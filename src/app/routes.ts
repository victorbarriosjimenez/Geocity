import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './login/login.component';

 const appRoutes: Routes = [
  { path: '',  component:  LoginComponent },
  { path: '**', component: NotFoundComponent },
  { path: 'register', component: NotFoundComponent }  
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