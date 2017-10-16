import { NgModule } from '@angular/core';
import {  
          MatButtonModule,
          MatFormFieldModule,
          MatCardModule,      
          MatIconModule
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