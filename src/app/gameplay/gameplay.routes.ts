import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './gameplay.component';
import { AuthGuard } from '../shared/auth.guard';
const gameplayRoutes: Routes = [
  { path: 'gameplay',  component: GameplayComponent, canActivate: [AuthGuard] ,  data: { animation: 'gameplay' }}
];
@NgModule({
  imports: [
    RouterModule.forChild(gameplayRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GameplayRoutesModule { }