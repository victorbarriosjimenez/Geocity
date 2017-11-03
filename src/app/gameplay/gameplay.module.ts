import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameplayComponent } from './gameplay.component';

import { MaterialElementsModule  } from '../shared/material-elements.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule
  ],
  declarations: [GameplayComponent],
  exports:[
    GameplayComponent
  ]
})
export class GameplayModule { }