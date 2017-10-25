import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutesModule } from './forum-routes';
import { NavigationComponent } from './Users/vicbarriosjimenez/Desktop/game-project/web-app/src/app/user/navigation/navigation.component';
@NgModule({
  imports: [
    CommonModule,
    ForumRoutesModule
  ],
  declarations: [
    ForumComponent,
    NavigationComponent
]
})
export class ForumModule { }