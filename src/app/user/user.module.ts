import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from  './list-user/list-user.component'; 
import { UserSearchComponent } from  './user-search/user-search.component'; 


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserProfileComponent,
    ListUserComponent,
    UserSearchComponent
  ]
})
export class UserModule { }