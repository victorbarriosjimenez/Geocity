import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes';
import { UserModule } from '../user/user.module';
import { FriendsRankingComponent } from './Users/vicbarriosjimenez/Desktop/game-project/web-app/src/app/user/friends-ranking/friends-ranking.component';
@NgModule({
  imports: [
    CommonModule,
    ForumRoutesModule,
    UserModule
  ],
  declarations: [
    ForumComponent,
    FriendsRankingComponent
]
})
export class ForumModule { }