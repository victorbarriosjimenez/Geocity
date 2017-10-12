import { NgModule } from '@angular/core';
import {  
          MatButtonModule,
          MatFormFieldModule,
          MatCardModule,      
        } from '@angular/material';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ], 
  declarations: [ ]
})
export class MaterialElementsModule { }