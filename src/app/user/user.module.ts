import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from  './list-user/list-user.component'; 
import { UserSearchComponent } from  './user-search/user-search.component'; 
import  { UserRoutesModule } from './user.routes'

@NgModule({
  imports: [
    CommonModule,
    UserRoutesModule
  ],
  declarations: [
    UserProfileComponent,
    ListUserComponent,
    UserSearchComponent
  ]
})
export class UserModule { }