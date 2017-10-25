import { NgModule } from '@angular/core';
import {  
          MatButtonModule,
          MatFormFieldModule,
          MatCardModule,      
          MatIconModule,
          MatInputModule,
          MatSpinner
        } from '@angular/material';

import { CommonModule } from '@angular/common';
import { ButtonUpperComponent } from './button-upper/button-upper.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ], 
  declarations: [,
    ButtonUpperComponent
]
})
export class MaterialElementsModule { }