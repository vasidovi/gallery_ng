import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})

export class PhotoDialogComponent implements OnInit{

  isLoggedIn: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    private auth: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }

  getDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onEdit(): void {
    this.router.navigate(['/image/edit/' + this.data.id]);
    this.onClose();
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}


