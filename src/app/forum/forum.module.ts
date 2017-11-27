import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes';
import { UserModule } from '../user/user.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { ForumService } from './../shared/forum.service';
import { MaterialElementsModule  } from '../shared/material-elements.module';
import { VotingComponent } from './voting/voting.component';

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
    ForumComponent,
    VotingComponent
  ],
  providers: [ 
    ForumService
  ],
  exports:[
    VotingComponent
  ]
})
export class ForumModule { }