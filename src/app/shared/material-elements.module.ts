import { NgModule } from '@angular/core';
import {  
          MatButtonModule,
          MatFormFieldModule,
          MatCardModule,      
          MatIconModule,
          MatInputModule,
          MatProgressSpinnerModule,
          MatSelectModule,
          MatStepperModule,
          MatTooltipModule,
          MatExpansionModule,
          MatSnackBarModule,
          MatTabsModule,
          MatProgressBarModule,
          MatToolbarModule,
          MatDialogModule
        } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogModule    
  ], 
  declarations: [
    FooterComponent
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTabsModule,
    FooterComponent,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogModule    
  ]
})
export class MaterialElementsModule { }