import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';

const forumRoutes: Routes = [
  { path: 'community',  component: ForumComponent,  data: { animation: 'community' }  }
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