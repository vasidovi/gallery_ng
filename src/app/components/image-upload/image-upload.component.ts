import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent implements OnInit {

  selectedFile: ImageSnippet;
  uploadForm: FormGroup;
  imageId;

  constructor(private imageService: GalleryService,
              private formBuilder: FormBuilder) {}

  private onSuccess(res) {
    console.log(res);
    this.imageId = res.id;
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, imageInput);

      let formData = new FormData();
      formData.append('file', this.selectedFile.file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(formData).subscribe(
        (res) => {
          this.onSuccess(res);
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  onSubmit() {
      const formData = new FormData();
      ['description', 'tags', 'catalogs', 'name', 'file'].forEach(i => {
        formData.append(i, this.uploadForm.get(i).value);
      });

      this.imageService.uploadImage(formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      name: '',
      description: '',
      tags: '',
      catalogs: '',
    });
  }

  // sortBy date parasyti funkcija
}
