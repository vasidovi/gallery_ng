import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})

export class MaterialModule { }
