import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameplayComponent } from './gameplay.component';

import { MaterialElementsModule  } from '../shared/material-elements.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    AgmCoreModule
  ],
  declarations: [GameplayComponent],
  exports:[
    GameplayComponent
  ]
})
export class GameplayModule { }