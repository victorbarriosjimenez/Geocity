import { NgModule } from '@angular/core';
import {  
          MdButtonModule, 
          MdCheckboxModule,
          MdInputModule,
          MdCardModule,
          MatFormFieldModule,
          MatCardModule,      
        } from '@angular/material';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MatFormFieldModule,
    MatCardModule
  ], 
  declarations: [ ]
})
export class MaterialElementsModule { }