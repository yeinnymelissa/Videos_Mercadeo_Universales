import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {

  constructor(
    private http: HttpClient
  ) { }

  getUrl(url:any): Observable<any> {
    return this.http.get<any>(`${url}`);
  }

  postUrl(url:any,t:any){
    return this.http.post<any>(`${url}`,t);
  }

  putUrl(url:any,t:any){
    return this.http.put<any>(`${url}`,t);
  }

  deleteUrl(url:any): Observable<any> {
    return this.http.delete<any>(`${url}`);
  }



}
