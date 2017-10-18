import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { ListUserComponent } from './list-user/list-user.component'; 
import { UserSearchComponent } from './user-search/user-search.component'; 
import { AuthGuard } from '../shared/auth.guard'

const userRoutes: Routes = [
    { path: 'profile',  component: UserProfileComponent, canActivate: [AuthGuard] }
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