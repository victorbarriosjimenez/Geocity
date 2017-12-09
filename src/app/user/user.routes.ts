import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component'; 
import { AuthGuard } from '../shared/auth.guard'
import { UpdateComponent } from './update/update.component';
import { FriendsRankingComponent } from './friends-ranking/friends-ranking.component';
const userRoutes: Routes = [
    { path: 'profile',  component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'notifications',  component: UserProfileComponent, canActivate: [AuthGuard] },    
    { path: 'update-profile', component: UpdateComponent, canActivate: [AuthGuard] },
    { path: 'social', component: FriendsRankingComponent,canActivate: [AuthGuard] },
    { path: 'search-friends', component: UserSearchComponent ,canActivate: [AuthGuard] }    
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