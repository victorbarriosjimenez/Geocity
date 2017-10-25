import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';
import { AuthGuard } from '../shared/auth.guard'

const forumRoutes: Routes = [
  { path: 'community',  component: ForumComponent, canActivate: [AuthGuard] ,  data: { animation: 'community' }  }
];
@NgModule({
  imports: [
    RouterModule.forChild(forumRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ForumRoutesModule { }