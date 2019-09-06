import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
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
  selectedCatalogsIds: number[] = [];
  isLoaded = false;
  // images: IPhoto[] = [];

  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this.loadCatalogs();
    // todo to make load tags to return popular tags 
    // this.loadTags(); 
    this.loadThumbnails();
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

    if (this.selectedCatalogsIds.length > 0){
    this.gallery.getImagesByCatalogIds(this.selectedCatalogsIds).then(data => {
      this.photos = data;
      this.isLoaded = true;
    });} else {
      this.loadThumbnails();
    }
  }

  getSelectedTags(catalog: ICatalog) {

    if (this.selectedCatalogsIds.includes(catalog.id)) {
      this.selectedCatalogsIds = this._arrayRemove(this.selectedCatalogsIds, catalog.id);
    } else {
      this.selectedCatalogsIds.push(catalog.id);
    }

    this.isLoaded = false;

    if (this.selectedCatalogsIds.length > 0){
    this.gallery.getImagesByCatalogIds(this.selectedCatalogsIds).then(data => {
      this.photos = data;
      this.isLoaded = true;
    });
    } else {
      this.loadThumbnails();
    }
  }

      private _arrayRemove(arr, value) {
    return arr.filter((ele) => {
      return ele !== value;
    });
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
