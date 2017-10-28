import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from './list-user/list-user.component'; 
import { UserSearchComponent } from './user-search/user-search.component'; 
import { AuthGuard } from '../shared/auth.guard'
import { UpdateComponent } from './update/update.component';
import { FriendsRankingComponent } from './friends-ranking/friends-ranking.component';
const userRoutes: Routes = [
    { path: 'profile',  component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'profile/update', component: UpdateComponent, canActivate: [AuthGuard] },
    { path: 'friends', component: FriendsRankingComponent,canActivate: [AuthGuard] },
    { path: 'worldwide', component: FriendsRankingComponent,canActivate: [AuthGuard] }    
  ];
@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutesModule { }