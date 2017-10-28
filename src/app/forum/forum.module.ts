import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes';
import { UserModule } from '../user/user.module';
@NgModule({
  imports: [
    CommonModule,
    ForumRoutesModule,
    UserModule
  ],
  declarations: [
    ForumComponent
]
})
export class ForumModule { }