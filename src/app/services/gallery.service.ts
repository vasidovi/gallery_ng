import { IFilterData } from '../models/filterData.model';
import { IPhoto } from './../models/photo.model';
import { ICatalog } from './../models/catalog.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }


  getThumbnails(): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>( environment.hostName + '/images').toPromise();
  }

  getTags(): Promise<any[]> {
    return this.http.get<any[]>(environment.hostName + '/tags').toPromise();
  }


  getThumbnailById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>(environment.hostName + '/image/metadata/' + id).toPromise();
  }

  getCatalogs(): Promise<ICatalog[]> {
    return this.http.get<ICatalog[]>(environment.hostName + '/catalogs').toPromise();
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


    return this.http.get<IPhoto[]>(environment.hostName + '/images/find' + queryString).toPromise();

  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(environment.hostName + '/upload', formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.hostName + '/image/' + id);
  }

  editImage(formData: FormData, id: number): Observable<any> {
    return this.http.put(environment.hostName + '/image/' + id, formData);
  }

}
