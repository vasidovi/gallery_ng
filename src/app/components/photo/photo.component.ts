import { GalleryService } from './../../services';
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

  constructor(private gallery: GalleryService,
              public dialog: MatDialog) { }

  openDialog(): void {
    this.gallery.getPhoto(this.photo.id)
      .subscribe(data => {
        const photoBig = data;
        this.dialog.open(PhotoDialogComponent, {
          data: {photoBig, id : this.photo.id},
        });
      });
  }
}



