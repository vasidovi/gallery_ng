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

  getPhoto(id: number): Observable<any> {
    console.log("id" + id);
    return this.http.get<any>('http://localhost:8080/image/' + id);
  }

  getCatalogs(): Promise<ICatalog[]> {
    return this.http.get<ICatalog[]>('http://localhost:8080/catalogs').toPromise();
  }

  getImagesByCatalogId(id: number): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images/catalog/' + id).toPromise();
  }

  getFilteredImages(query: any): Promise<IPhoto[]> {

    let catalogIds = '?catalogIds=';

    for ( let id of query.catalogIds ) {
      catalogIds += id + ',';
    }
    catalogIds = query.substring(0, query.length - 1);

    let tagNames = '?tagNames=';
    for (let tag of query.tags ) {
      tagNames += tag + ',';
    }
    tagNames = query.substring(0, query.length - 1);

    const name = '?name=' + query.name;
    const description = '?description=' + query.description;

    const queryString = catalogIds + '&' + tagNames + '&' + name + '&' + description;

    console.log(queryString);

    return this.http.get<IPhoto[]>('http://localhost:8080/images/filtered/' + queryString).toPromise();

  }

  getImagesByCatalogIds(ids: number[]): Promise<IPhoto[]> {
    let query = '?ids=';

    for (let i = 0; i < ids.length; i++) {
      query += ids[i] + ',';
    }
    query = query.substring(0, query.length - 1);

    return this.http.get<IPhoto[]>('http://localhost:8080/images/catalogs/' + query).toPromise();
  }


  // WIP Upload

  public uploadImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/image' + id);
  }

  public editImage(formData: FormData, id: number): Observable<any> {
    return this.http.put('http://localhost:8080/image' + id, formData);
  }



}
