import { AuthService } from './../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ICatalog } from './../../models/catalog.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

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


  editForm: FormGroup = this.formBuilder.group({
    name: '',
    description: '',
    tags: this.formBuilder.array([]),
    catalogs: '',
  });

  result = {
    status: '',
    message: '',
  };

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private gallery: GalleryService,
              private formBuilder: FormBuilder,
              public router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this._loadData(this.id);
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

  removeTag(index: number): void {

    const tagArray = this.editForm.get('tags') as FormArray;

    if (index >= 0) {
      tagArray.removeAt(index);
      this.tagList = tagArray.value;
    }
  }

  addTag(event: MatChipInputEvent): void {

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
  }

  edit(): void {
    const formData = new FormData();
    ['description', 'tags', 'catalogs', 'name'].forEach(i => {
      formData.append(i, this.editForm.value[i]);
    });
    this.gallery.editImage(formData, this.id).subscribe(
      (res) => {
        this.result.status = 'ok';
        this.result.message = 'Changes saved';
      },
      (err) => {
        this.result.status = 'failed';
        this.result.message = 'Edit failed';
      });
  }

  delete(): void {
    this.gallery.delete(this.id).subscribe(
      (res) => this.router.navigate(['/']),
      (err) => {
        this.result.status = 'failed';
        this.result.message = 'Delete failed';
      });
  }

  isAdmin(): boolean {
   return this.authService.isAdmin();
  }
}
