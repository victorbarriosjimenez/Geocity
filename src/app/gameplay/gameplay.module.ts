import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameplayComponent } from './gameplay.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';


import { MaterialElementsModule  } from '../shared/material-elements.module';

import { GameplayRoutesModule } from './gameplay.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialElementsModule,
    GameplayRoutesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapskey
    })
  ],
  declarations: [
    GameplayComponent
  ]
})
export class GameplayModule { }