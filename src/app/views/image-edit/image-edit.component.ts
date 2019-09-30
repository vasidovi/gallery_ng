import { ICatalog } from './../../models/catalog.model';
import { DeleteConfirmDialogComponent } from './../../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  id: number;
  photo: any;
  catalogList: any;
  isLoaded = false;
  tagList = [];
  selectedCatalogs: ICatalog[] = [];

  // for Autocomplete of tags
  allTags: string[] = [];


  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private gallery: GalleryService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              public router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this._loadData(this.id);
    this._loadTags();
  }

  private _loadData(id: number): void {

    this.gallery.getCatalogs()
      .then(data => this.catalogList = data);

    this.gallery.getThumbnailById(id)
      .then(data => {
        this.photo = data;

        // this.catalogList = this.catalogList.map(c => c.name);
        // const catalogNames = this.photo.catalogs.map(catalog => catalog.name);
        this.selectedCatalogs = this.photo.catalogs;
        this.tagList = this.photo.tags.map(tag => tag.name);
        this.isLoaded = !this.isLoaded;
      });
  }

  private _delete(): void {
    this.gallery.delete(this.id).subscribe(
      (res) => {

        this.snackBar.open('Photo has been deleted', 'X', {
          duration: 2000,
        });
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      (err) => {
        this.snackBar.open('Delete failed', 'X', {
          duration: 2000,
        });
      });
  }

  private _loadTags(): void {
    this.gallery.getTags().then((data) => {
      data.forEach(d => {
        this.allTags.push(d.name);
      });
    });
  }


  onSubmit(f): void {
    const formData = new FormData();

    f.form.value.catalogs = f.form.value.catalogs.map(catalog => catalog.name);

    ['description', 'tags', 'catalogs', 'name'].forEach(i => {
      formData.append(i, f.form.value[i]);
    });

    this.gallery.editImage(formData, this.id).subscribe(
      (res) => {
        this.snackBar.open('Changes saved', 'X', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('Edit failed', 'X', {
          duration: 2000,
        });
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._delete();
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
