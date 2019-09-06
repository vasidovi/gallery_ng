import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { IPhoto } from './../../models/photo.model';
import { ICatalog } from 'src/app/models/catalog.model';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  photos: IPhoto[] = [];
  catalogs: ICatalog[];
  selectedCatalogs: ICatalog[] = [];
  selectedCatalogsIds: number[] = [];

  isLoaded = false;

  // tags
  tags: string[] = [];
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  // name or description search
  search = '';

  //
  arrow = {
    name: ''
  }

  resCount = this.photos.length;


  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this.loadCatalogs();
    // todo to make load tags to return popular tags optional, after I implement what needs to be implemented

    this.loadThumbnails();
    this.sortByDate();
  }


  loadThumbnails(): void {
    this.gallery.getThumbnails()
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
      });
  }

  loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => this.catalogs = data);
    this.isLoaded = true;
  }

  getSelectedValue(catalog: ICatalog) {

    if (this.selectedCatalogsIds.includes(catalog.id)) {
      this.selectedCatalogsIds = this._arrayRemove(this.selectedCatalogsIds, catalog.id);
    } else {
      this.selectedCatalogsIds.push(catalog.id);
    }

    this.isLoaded = false;

    if (this.selectedCatalogsIds.length > 0) {
      this.gallery.getImagesByCatalogIds(this.selectedCatalogsIds).then(data => {
        this.photos = data;
        this.isLoaded = true;
      });
    } else {
      this.loadThumbnails();
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  private _arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  initSearch(e: string) {
    if (e.length > 2) {
      console.log('sending request...');
    }
  }

  // default down - descending date i.e. newest first 
  sortByDate() {

    // Newest photos are displayed first
    if (this.arrow.name === 'arrow_drop_down') {
      this.arrow.name = 'arrow_drop_up';
      this.photos.sort(dateOldestFirst);

    } else {
      this.arrow.name = 'arrow_drop_down';
      this.photos.sort(dateNewestFirst);
    }

    function dateOldestFirst(a, b) {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    };

    function dateNewestFirst(a, b) {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();
      return dateB > dateA ? 1 : -1;
    };

  }

  //   if (this.selectedCatalogs.length === 0) {
  //     this.photos = [];
  //   }

  //   if (this.selectedCatalogs.includes(catalog)) {
  //     this.selectedCatalogs = this._arrayRemove(this.selectedCatalogs, catalog);
  //     this.photos = this.photos.filter(image => image.catalogs[0] !== '' + catalog.id);
  //   } else {
  //     this.selectedCatalogs.push(catalog);

  //     this.isLoaded = false;

  //     this.gallery.getImagesByCatalogId(catalog.id).then(data => {
  //       data.forEach(d => d.catalogs = ['' + catalog.id]);
  //       this.photos = this.photos.concat(data);
  //       this.isLoaded = true;
  //     });
  //   }

  //   if (this.selectedCatalogs.length === 0) {
  //     this.loadThumbnails();
  //   }

  // }

  // getPhotos(): IPhoto[] {
  //   return this.photos;
  // }


}


  // onCatalogChange //

  // loadPhotos(): void {
  //   this.gallery.getPhotos()
  //     .subscribe(data => {
  //       console.log(data.keys);
  //       this.photos = data;
  //     });
  // }

// }
