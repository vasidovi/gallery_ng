import { IFilterData } from './../models/filterData.motel';
import { IPhoto } from './../models/photo.model';
import { ICatalog } from './../models/catalog.model';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Globals from './../globals/globals';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }


  getThumbnails(): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>( Globals.hostName + '/images').toPromise();
  }

  getTags(): Promise<any[]>{
    return this.http.get<any[]>(Globals.hostName + '/tags').toPromise();
  }


  getThumbnailById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>(Globals.hostName + '/image/metadata/' + id).toPromise();
  }

  getPhoto(id: number): Observable<any> {
    return this.http.get<any>(Globals.hostName + '/image/' + id);
  }

  getCatalogs(): Promise<ICatalog[]> {
    return this.http.get<ICatalog[]>(Globals.hostName + '/catalogs').toPromise();
  }

  getFilteredImages(query: IFilterData): Promise<IPhoto[]> {

    let catalogIds = 'catalogIds=';

    for ( const id of query.catalogIds ) {
      catalogIds += id + ',';
    }

    let tagNames = 'tags=';
    for (const tag of query.tags ) {
      tagNames += tag + ',';
    }

    const search = 'search=' + query.search;
    const queryString = '?' + catalogIds + '&' + tagNames + '&' + search;


    return this.http.get<IPhoto[]>(Globals.hostName + '/images/find' + queryString).toPromise();

  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(Globals.hostName + '/upload', formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(Globals.hostName + '/image/' + id);
  }

  editImage(formData: FormData, id: number): Observable<any> {
    return this.http.put(Globals.hostName + '/image/' + id, formData);
  }

}
