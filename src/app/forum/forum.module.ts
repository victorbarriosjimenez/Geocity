import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes';
import { UserModule } from '../user/user.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { PostsService } from './../shared/posts.service';
import { MaterialElementsModule  } from '../shared/material-elements.module';

@NgModule({
  imports: [
    CommonModule,
    ForumRoutesModule,
    UserModule,
    MaterialElementsModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    ForumComponent
  ],
  providers: [ 
    PostsService
  ]
})
export class ForumModule { }