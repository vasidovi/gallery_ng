import { DeleteConfirmDialogComponent } from './../../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../services/auth.service';
import { ICatalog } from './../../models/catalog.model';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { MatSnackBar } from '@angular/material';
import { ValidateLength } from 'src/app/validators/length.validator';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  id: number;
  photo: any;
  catalogList: any;
  initialCatalogs: ICatalog[];
  isLoaded = false;
  tagList = [];
  external = [];

  // for Autocomplete of tags
  allTags: string[] = [];

  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private gallery: GalleryService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              public router: Router,
  ) {}

 private _createForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [ ValidateLength(4) ]],
      tags: [this.formBuilder.array([], Validators.required)],
      catalogs: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this._loadData(this.id);
    this._loadTags();
    this._createForm();
  }

  private _loadData(id: number): void {

    this.gallery.getCatalogs()
      .then(data => this.catalogList = data);

    this.gallery.getThumbnailById(id)
      .then(data => {
        this.photo = data;

        this.catalogList = this.catalogList.map(c => c.name);
        const catalogNames = this.photo.catalogs.map(catalog => catalog.name);

        this.editForm.get('catalogs').setValue(catalogNames);
        this.external = catalogNames;

        this.tagList = this.photo.tags.map(tag => tag.name);

        this.editForm.get('name').setValue(this.photo.name);
        this.editForm.get('description').setValue(this.photo.description);

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


  edit(): void {
    const formData = new FormData();
    ['description', 'catalogs', 'name'].forEach(i => {
      formData.append(i, this.editForm.value[i]);
    });

    // for testing only .. 
    const tagArray = this.editForm.value.tags as FormArray;
    tagArray.clear();
    for (const value of this.tagList) {
      tagArray.push(this.formBuilder.control(value));
    }
    // .. testing end
    formData.append('tags', this.editForm.value.tags.value);

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
