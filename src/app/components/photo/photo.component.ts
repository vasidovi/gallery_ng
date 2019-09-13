import { GalleryService, AuthService } from './../../services';
import { IPhoto } from './../../models/photo.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDialogComponent } from '../../dialogs/photo-dialog/photo-dialog.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  constructor(private gallery: GalleryService,
              private auth: AuthService,
              public dialog: MatDialog) { }


  isLoggedIn: boolean;

  @Input() photo: IPhoto;


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  openDialog(): void {
    this.gallery.getPhoto(this.photo.id)
      .subscribe(data => {
        const photoBig = data;
        this.dialog.open(PhotoDialogComponent, {
          data: photoBig,
        });
      });
  }

}



