import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbstractRestService<T> {

  constructor(protected _http: HttpClient,
    @Inject('actionUrl') private actionUrl: string) { 
  }

  // test(): string {
  //   return this.testString
  // }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.actionUrl)
  }

  get(id: number): Observable<T> {
    const url = `${this.actionUrl}/${id}`
    return this._http.get<T>(url)
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.actionUrl}/${id}`
    return this._http.delete(url)
  }

  create(entity: T): Observable<T> {
    return this._http.post<T>(this.actionUrl, entity)
  }

  update(id: number, entity: T): Observable<T> {
    const url = `${this.actionUrl}/${id}`
    return this._http.post<T>(url, entity)
  }
}
