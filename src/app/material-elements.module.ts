import { NgModule } from '@angular/core';
import {  MdButtonModule, 
          MdCheckboxModule } from '@angular/material';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule
  ], 
  declarations: [ ]
})
export class MaterialElementsModule { }