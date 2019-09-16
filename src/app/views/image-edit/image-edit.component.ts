import { DeleteConfirmDialogComponent } from './../../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../services/auth.service';
import { ICatalog } from './../../models/catalog.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatSnackBar, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

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

  // tag chip list
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  // for Autocomplete of tags
  allTags: string[] = [];
  filteredTags: Observable<string[]>;
  tagControl = new FormControl();

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  editForm: FormGroup = this.formBuilder.group({
    name: '',
    description: '',
    tags: this.formBuilder.array([]),
    catalogs: '',
  });

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private gallery: GalleryService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              public router: Router,
  ) {
  this.filteredTags = this.tagControl.valueChanges.pipe(
    startWith(null),
    map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tagArray = this.editForm.get('tags') as FormArray;
    tagArray.push(this.formBuilder.control(event.option.viewValue.trim()));
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
    this.tagList = tagArray.value;

  }

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

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

        this.catalogList = this.catalogList.map(c => c.name);
        const catalogNames = this.photo.catalogs.map(catalog => catalog.name);

        this.editForm.get('catalogs').setValue(catalogNames);

        this.tagList = this.photo.tags.map(tag => tag.name);

        for (const value of this.tagList) {
          const tagArray = this.editForm.get('tags') as FormArray;
          tagArray.push(this.formBuilder.control(value));
        }

        this.editForm.get('name').setValue(this.photo.name);
        this.editForm.get('description').setValue(this.photo.description);

        this.isLoaded = !this.isLoaded;
      });
  }

  private _delete(): void {
    this.gallery.delete(this.id).subscribe(
      (res) => {

        this._snackBar.open('Photo has been deleted', 'X', {
          duration: 2000,
        });
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      (err) => {
        this._snackBar.open('Delete failed', 'X', {
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

  removeTag(index: number): void {

    const tagArray = this.editForm.get('tags') as FormArray;

    if (index >= 0) {
      tagArray.removeAt(index);
      this.tagList = tagArray.value;
    }
  }

  addTag(event: MatChipInputEvent): void {

    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {

      const value = event.value;

      // Add tag
      if ((value || '').trim()) {
        const tagArray = this.editForm.get('tags') as FormArray;
        tagArray.push(this.formBuilder.control(value.trim()));
        this.tagList = tagArray.value;
      }

      // Reset the input value
      if (event.input) {
        event.input.value = '';
      }
      this.tagControl.setValue(null);
    }
  }

  edit(): void {
    const formData = new FormData();
    ['description', 'tags', 'catalogs', 'name'].forEach(i => {
      formData.append(i, this.editForm.value[i]);
    });
    this.gallery.editImage(formData, this.id).subscribe(
      (res) => {
        this._snackBar.open('Changes saved', 'X', {
          duration: 2000,
        });
      },
      (err) => {
        this._snackBar.open('Edit failed', 'X', {
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
