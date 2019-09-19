import { IFilterData } from './../models/filterData.motel';
import { IPhoto } from './../models/photo.model';
import { ICatalog } from './../models/catalog.model';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }


  getThumbnails(): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images').toPromise();
  }

  public getTags(): Promise<any[]>{
    return this.http.get<any[]>('http://localhost:8080/tags').toPromise();
  }


  getThumbnailById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>('http://localhost:8080/image/metadata/' + id).toPromise();
  }

  getPhoto(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/image/' + id);
  }

  getCatalogs(): Promise<ICatalog[]> {
    return this.http.get<ICatalog[]>('http://localhost:8080/catalogs').toPromise();
  }

  // no longer used up for removal
  getImagesByCatalogId(id: number): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images/catalog/' + id).toPromise();
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


    return this.http.get<IPhoto[]>('http://localhost:8080/images/find' + queryString).toPromise();

  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/upload', formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/image/' + id);
  }

  editImage(formData: FormData, id: number): Observable<any> {
    return this.http.put('http://localhost:8080/image/' + id, formData);
  }

}
