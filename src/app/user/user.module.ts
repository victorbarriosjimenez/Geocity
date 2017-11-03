import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from  './list-user/list-user.component'; 
import { UserSearchComponent } from  './user-search/user-search.component'; 
import  { UserRoutesModule } from './user.routes'
import { MaterialElementsModule  } from '../shared/material-elements.module';
import { AuthenticationService } from '../shared/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ButtonUpperComponent } from './button-upper/button-upper.component';
import { FriendsRankingComponent } from './friends-ranking/friends-ranking.component';
import { RankingComponent } from './ranking/ranking.component';
import { UserService } from '../shared/user.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    UserRoutesModule
  ],
  declarations: [
    UserProfileComponent,
    ListUserComponent,
    UserSearchComponent,
    NavigationComponent,
    ButtonUpperComponent,
    FriendsRankingComponent,
    RankingComponent
  ],
  exports: [
    NavigationComponent,
    ButtonUpperComponent
  ],
  providers: [
    AuthenticationService,
    UserService
  ]
})

export class UserModule { }
