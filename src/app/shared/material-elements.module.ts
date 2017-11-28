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
          MatDialogModule,
          MatMenuModule
        } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { VotingComponent } from './voting/voting.component';

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
    MatDialogModule,
    MatMenuModule
  ], 
  declarations: [
    FooterComponent,
    VotingComponent
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
    VotingComponent,
    MatProgressBarModule,
    MatToolbarModule,
    MatDialogModule ,
    MatMenuModule 
  ]
})
export class MaterialElementsModule { }