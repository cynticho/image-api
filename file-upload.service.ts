import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../components/upload-files/upload-files.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/image';

  constructor(private http: HttpClient) { }

  // poster une photo
  upload(file: File, image: Image): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', image.title);
    formData.append('description', image.description);
    formData.append('category_id', image.category_id);
    formData.append('price',image.price)
    formData.append('photographer_id', image.photographer_id);
    console.log("formdata",formData)

    return this.http.post(this.baseUrl, formData);
  }

  // incrementLikes(id: number): Observable<Image> {
    // return this.http.patch<Image>(`${this.baseUrl}/${id}/like`, {});
  // }

  // recuperer une image par son id
  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'blob' });
  }

  //suprimmer une photo par son id
  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // recuperer les photos non suprimmées d'une categorie
  getAllByPhotographeId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/photographe/"+id);
  }

  // recuperer les photos non suprimmées d'une categorie
  getAllByPhotographeIdTrashed(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/photographe/"+id+"?isDeleted=true");
  }

  // recuperer les photos non suprimmées d'un photographe
  getAllByCategorieId(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/categorie/"+id);
  }

  // recuperer les photos non suprimmées d'un photographe
  getAllByCategorieIdTrashed(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/categorie/"+id+"?isDeleted=true");
  }

  // recuperer les photos non suprimmées
  getFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // recuperer les photos suprimmées
  getFilesTrashed(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"?isDeleted=true");
  }

  //inrementer les likeS d'une photo
  like(id: number): Observable<any> {
    return this.http.patch(this.baseUrl+"/"+id+"/like",{});
  }

   //decrementer les likeS d'une photo
   unlike(id: number): Observable<any> {
    return this.http.patch(this.baseUrl+"/"+id+"/unlike",{});
  }

  // restorer une photo suprimmée
  restore(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/"+id+"/restore");
  }

  // compter le nombre de photo
  count(): Observable<number> {
    return this.http.get<number>(this.baseUrl+"/count");
  }


}
