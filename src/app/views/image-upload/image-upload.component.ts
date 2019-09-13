import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { ICatalog } from 'src/app/models/catalog.model';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';


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

  catalogList: ICatalog[];

  // tag chip list
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;


  constructor(private gallery: GalleryService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
  }

  removeFile(): void {
    this.file = null;
  }

  setFileValue(event: FileInput): void {
    if (event && this.file !== event.files[0]) {
      this.file = event.files[0];
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
