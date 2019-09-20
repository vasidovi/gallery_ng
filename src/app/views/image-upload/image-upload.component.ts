import { ValidateLength } from 'src/app/validators/length.validator';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { ICatalog } from 'src/app/models/catalog.model';
import { MatChipInputEvent, MatSnackBar, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {

  tagList = [];

  uploadForm: FormGroup;

  file: File;
  isHovering: boolean;
  url;

  catalogList: ICatalog[];

  // tag chip list
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  isTagsTouched = false;

  // for Autocomplete of tags
  allTags: string[] = [];
  filteredTags: Observable<string[]>;
  tagControl = new FormControl();

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  @ViewChild('chipList', {static: false}) chipList;

  constructor(private gallery: GalleryService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.isTagsTouched = true;
    const tagArray = this.uploadForm.value.tags as FormArray;
    tagArray.push(this.formBuilder.control(event.option.viewValue.trim()));
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
    this.tagList = tagArray.value;
    this.chipList.errorState = this._determineChipListErrorState();

  }

  private _determineChipListErrorState(): boolean {
    return this.uploadForm.value.tags.invalid;
  }

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  removeFile(): void {
    this.file = null;
    this.url = null;
  }

  setFileValue(event: FileInput): void {
    if (event && this.file !== event.files[0]) {
      this.file = event.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(event.files[0]); // read file as data url
      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      };
    }
  }

  empty(): void {
    this._createForm();
    this.tagList = [];
    this.isTagsTouched = false;
    this.file = null;
    this.url = null;
  }

  private _createForm(): void {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      name: ['', Validators.required],
      description: ['', [ValidateLength(4)]],
      tags: [this.formBuilder.array([], Validators.required)],
      catalogs: [''],
    });
  }

  onSubmit(): void {
    const formData = new FormData();

    this.uploadForm.get('file').setValue(this.file);

    ['description', 'catalogs', 'name', 'file'].forEach(i => {
      formData.append(i, this.uploadForm.value[i]);
    });

    formData.append('tags', this.uploadForm.value.tags.value);

    this.gallery.uploadImage(formData).subscribe(
      (res) => {
        this.snackBar.open('Upload was successful', 'X', {
          duration: 2000,
        });

        // empty form fields
        this.empty();

      }, (err) => {

        this.snackBar.open('Upload failed', 'X', {
          duration: 2000,
        });
      }
    );
  }

  ngOnInit(): void {
    this._loadCatalogs();
    this._loadTags();
    this._createForm();
  }

  private _loadTags(): void {
    this.gallery.getTags().then((data) => {
      data.forEach(d => {
        this.allTags.push(d.name);
      });
    });
  }

  private _loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => this.catalogList = data);
  }

  removeTag(index: number): void {

    const tagArray = this.uploadForm.value.tags as FormArray;

    if (index >= 0) {
      tagArray.removeAt(index);
      this.tagList = tagArray.value;
      this.chipList.errorState = this._determineChipListErrorState();
    }
  }

  addTag(event: MatChipInputEvent): void {

    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      this.isTagsTouched = true;
      const value = event.value;

      // Add tag
      if ((value || '').trim()) {
        const tagArray = this.uploadForm.value.tags as FormArray;
        tagArray.push(this.formBuilder.control(value.trim()));
        this.tagList = tagArray.value;
      }

      // Reset the input value
      if (event.input) {
        event.input.value = '';
      }
      this.tagControl.setValue(null);
      this.chipList.errorState = this._determineChipListErrorState();
    }
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {

    const file = event.item(0);
    if (file.type.split('/')[0] === 'image') {
      this.file = file;
    }
  }
}
