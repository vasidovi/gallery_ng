import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';
import { ICatalog } from 'src/app/models/catalog.model';
import { MatChipInputEvent } from '@angular/material';


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


  catalogList: ICatalog[];

  // tag chip list
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;


  constructor(private gallery: GalleryService,
              private formBuilder: FormBuilder) {
  }

  private onSuccess(res) {
    console.log(res);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  onSubmit() {
    const formData = new FormData();

    if (this.uploadForm.value.file) {
      this.uploadForm.get('file').setValue(this.uploadForm.get('file').value.files[0]);

      ['description', 'tags', 'catalogs', 'name', 'file'].forEach(i => {
        formData.append(i, this.uploadForm.value[i]);
      });
      this.gallery.uploadImage(formData).subscribe();
    } else {
      console.log('no file');
    }
  }

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs(): void {
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

}
