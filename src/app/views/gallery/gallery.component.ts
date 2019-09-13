import { IFilterData } from '../../models/filterData.motel';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit, HostListener } from '@angular/core';
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
  isLoaded = false;


  // tags
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  // arrow for sorting by date
  arrow = {
    name: ''
  };

  filterData: IFilterData = {
    tags: [],
    catalogIds: [],
    search: '',
  };

  resCount = this.photos.length;

  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this._loadCatalogs();
    this._loadThumbnails();
    this.sortByDate();
  }

  getPhotosCount() {
    if (this.photos) {
      return this.photos.length;
    } else {
      return 0;
    }
  }

  getSelectedValue(catalog: ICatalog) {

    if (this.filterData.catalogIds.includes(catalog.id)) {
      this.filterData.catalogIds = this._arrayRemove(this.filterData.catalogIds, catalog.id);
    } else {
      this.filterData.catalogIds.push(catalog.id);
    }

    this._filterFiles();

  }

  removeTag(tag: string): void {
    const index = this.filterData.tags.indexOf(tag);

    if (index >= 0) {
      this.filterData.tags.splice(index, 1);
      this._filterFiles();
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.filterData.tags.push(value.trim());
      this._filterFiles();
    }
    // Reset the input value
    if (event.input) {
      input.value = '';
    }
  }

  initSearch(event: string) {
    const change = Math.abs(this.filterData.search.length - event.length);
    if (change > 0) {
      this.filterData.search = event;
      this._filterFiles();
    }
  }

  // default is arrow down - descending date i.e. newest photos first
  sortByDate(): void {

    if (this.arrow.name === 'arrow_drop_down') {
      this.arrow.name = 'arrow_drop_up';
      this.photos.sort(dateOldestFirst);

    } else {
      this.arrow.name = 'arrow_drop_down';
      this.photos.sort(dateNewestFirst);
    }

    function dateOldestFirst(a: IPhoto, b: IPhoto) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    }

    function dateNewestFirst(a: IPhoto, b: IPhoto) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB > dateA ? 1 : -1;
    }
  }

  private _filterFiles(): void {
    const isFilterEmpty = (this.filterData.search === '' &&
      this.filterData.tags.length === 0 && this.filterData.catalogIds.length === 0) ? true : false;

    this.isLoaded = false;

    if (isFilterEmpty) {
      this._loadThumbnails();
    } else {
      this.gallery.getFilteredImages(this.filterData).then(data => {
        this.photos = data;
        this.isLoaded = true;
      });
    }
  }

  private _arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
  }

  private _loadThumbnails(): void {
    this.gallery.getThumbnails()
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
      });
  }

  private _loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => this.catalogs = data);
    this.isLoaded = true;
  }
}
