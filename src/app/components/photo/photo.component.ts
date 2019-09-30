import { IPhoto } from './../../models/photo.model';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDialogComponent } from '../../dialogs/photo-dialog/photo-dialog.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {

  isLoggedIn: boolean;

  @Input() photo: IPhoto;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {

        this.dialog.open(PhotoDialogComponent, {
          data: {photoMetadata : this.photo},
        });
  }
}



