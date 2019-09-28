import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { MatSnackBar } from '@angular/material';
import { FileInput } from 'ngx-material-file-input';

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

  name;
  catalogs;
  description;
  catalogList: string[] = [];

  // for Autocomplete of tags
  allTags: string[] = [];

  constructor(private gallery: GalleryService,
              private snackBar: MatSnackBar) {}

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
    this.tagList = [];
    this.file = null;
    this.url = null;
  }

  onSubmit(f): void {
    const formData = new FormData();

    ['description',  'tags', 'catalogs', 'name'].forEach(i => {
      formData.append(i, f.form.value[i]);
    });

    formData.append('file', this.file);

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
  }

  private _loadTags(): void {
    this.gallery.getTags().then(data => {
      data.forEach(d => {
        this.allTags.push(d.name);
      });
    });
  }

  private _loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => {
        data.forEach(d => {
          this.catalogList.push(d.name)
        });
      });
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
