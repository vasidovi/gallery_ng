import { IFilterData } from '../../models/filterData.model';
import { GalleryService } from './../../services/gallery.service';
import { Component, OnInit, HostListener } from '@angular/core';

import { IPhoto } from './../../models/photo.model';
import { ICatalog } from 'src/app/models/catalog.model';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  photos: IPhoto[] = [];
  catalogs: ICatalog[];
  selectedCatalogs: ICatalog[] = [];
  isLoaded = false;

  photosInRow: number;
  innerWidth: number;

  allTags: string[] = [];

  // arrow for sorting by date
  arrow = {
    name: ''
  };

  filterData: IFilterData = {
    tags: [],
    catalogIds: [],
    search: '',
  };

  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this._loadCatalogs();
    this._loadThumbnails();
    this.sortByDate();
    this._setPhotoInRowCount();
  }

  @HostListener('window:resize', ['$event'])
  onResize(_) {

    this._setPhotoInRowCount();
  }

  private _setPhotoInRowCount() {
    const imageDisplayAreaWidth = 1350;
    const imageWidth = 330;

    this.innerWidth = (window.innerWidth < imageDisplayAreaWidth) ? window.innerWidth : imageDisplayAreaWidth;
    const rows = Math.floor(this.innerWidth / imageWidth);
    this.photosInRow = rows > 0 ? rows : 1;
  }

  getPhotosCount() {
    if (this.photos) {
      return this.photos.length;
    } else {
      return 0;
    }
  }

  getSelectedCatalogs(): void {
    this.filterData.catalogIds = this.selectedCatalogs.map( c => c.id);
    this._filterFiles();
  }

  getSelectedTags(): void{
    this._filterFiles();
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
        // add tag names for auto search
        this.photos.forEach(photo => photo.tags.forEach(tag => {
          // tslint:disable-next-line: no-string-literal
          if (!this.allTags.includes(tag['name'])) {
            // tslint:disable-next-line: no-string-literal
            this.allTags.push(tag['name']);
          }
        }));
        this.isLoaded = true;
      });
  }

  private _loadCatalogs(): void {
    this.gallery.getCatalogs()
      .then(data => this.catalogs = data);
    this.isLoaded = true;
  }
}
