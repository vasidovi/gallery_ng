import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {

  ngOnInit(): void {

  }

  @Input() photo: IPhoto;

  constructor(private gallery: GalleryService,
    public dialog: MatDialog) { }

  openDialog(): void {
    this.gallery.getPhoto(this.photo.id)
      .subscribe(data => {
        const photoBig = data;
        this.dialog.open(PhotoDialogComponent, {
          width: '80vw',
          height: '80vh',
          data: photoBig,
        });
      })
  }

}



