import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from  './list-user/list-user.component'; 
import { UserSearchComponent } from  './user-search/user-search.component'; 
import  { UserRoutesModule } from './user.routes'
import { MaterialElementsModule  } from '../shared/material-elements.module';
import { AuthenticationService } from '../shared/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    UserRoutesModule
  ],
  declarations: [
    UserProfileComponent,
    NavigationComponent,
    ListUserComponent,
    UserSearchComponent
  ],
  providers: [
    AuthenticationService,  
  ]
})

export class UserModule { }
