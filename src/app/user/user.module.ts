import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { UserProfileComponent } from './user-profile.component';
 
import { UserSearchComponent } from  './user-search/user-search.component'; 
import  { UserRoutesModule } from './user.routes'
import { MaterialElementsModule  } from '../shared/material-elements.module';
import { AuthenticationService } from '../shared/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ButtonUpperComponent } from './button-upper/button-upper.component';
import { FriendsRankingComponent } from './friends-ranking/friends-ranking.component';
import { RankingComponent } from './ranking/ranking.component';
import { UserService } from '../shared/user.service';
import { GameplayModule } from './../gameplay/gameplay.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutesModule,
    GameplayModule
  ],
  declarations: [
    UserProfileComponent,
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
