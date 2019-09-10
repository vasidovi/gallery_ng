import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})

export class PhotoDialogComponent{

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }

  getDate(date: string): string {
    const currentDatetime = new Date(date);
    const month = (currentDatetime.getMonth() + 1) < 10 ? '0' + (currentDatetime.getMonth() + 1) : (currentDatetime.getMonth() + 1);
    const day = (currentDatetime.getDate() < 10) ? '0' + currentDatetime.getDate() : '' + currentDatetime.getDate();

    return currentDatetime.getFullYear() + '-' + month + '-' + day;
  }
}


