import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { ICatalog } from 'src/app/models/catalog.model';
import { MatChipInputEvent, MatSnackBar, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';


class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {

  selectedFile: ImageSnippet;

  tagList = [];

  uploadForm: FormGroup = this.formBuilder.group({
    file: '',
    name: '',
    description: '',
    tags: this.formBuilder.array([]),
    catalogs: '',
  });

  file: File;
  isHovering: boolean;
  url;

  catalogList: ICatalog[];

  // tag chip list
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  //tags for Autocomplete 
  allTags: string[] = [];
  filteredTags: Observable<string[]>;
  tagControl = new FormControl();

  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;


  constructor(private gallery: GalleryService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
      this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filterTag(tag) : this.allTags.slice()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tagArray = this.uploadForm.get('tags') as FormArray;
    tagArray.push(this.formBuilder.control(event.option.viewValue.trim()));
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
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
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.url = e.target.result;

      }
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    this.uploadForm.get('file').setValue(this.file);

    ['description', 'tags', 'catalogs', 'name', 'file'].forEach(i => {
      formData.append(i, this.uploadForm.value[i]);
    });
    this.gallery.uploadImage(formData).subscribe(
      (res) => {
        this._snackBar.open('Upload was successful', 'X', {
          duration: 2000,
        });
      }, (err) => {

        this._snackBar.open('Upload failed', 'X', {
          duration: 2000,
        });
      }
    );
  }

  ngOnInit(): void {
    this._loadCatalogs();
    this._loadTags();
  }

  private _loadTags(): void{
    this.gallery.getTags().then( (data) => {
      data.forEach(d => {
        this.allTags.push(d['name']);
      });
    });
  }
  
  private _loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => this.catalogList = data);
  }


  removeTag(index: number): void {

    const tagArray = this.uploadForm.get('tags') as FormArray;

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
      const tagArray = this.uploadForm.get('tags') as FormArray;
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
