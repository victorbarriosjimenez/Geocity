import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes':;

@NgModule({
  imports: [
    CommonModule,
    ForumRoutesModule
  ],
  declarations: [
    ForumComponent
  ]
})
export class ForumModule { }