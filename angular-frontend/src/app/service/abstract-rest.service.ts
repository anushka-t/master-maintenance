import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbstractRestService<T> {

  constructor(protected _http: HttpClient,
    @Inject('actionUrl') protected actionUrl: string,
    @Inject(LOCALE_ID) protected locale: string) { 
  }

  getAll(): Observable<any> {
    return this._http.get<any>(this.actionUrl)
  }

  get(id: number): Observable<any> {
    const url = `${this.actionUrl}/${id}`
    return this._http.get<any>(url)
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.actionUrl}/${id}`
    return this._http.delete(url)
  }

  create(entity: T): Observable<any> {
    return this._http.post<any>(this.actionUrl, {
      data: {
        ...entity
      }
    })
  }

  update(id: number, entity: T): Observable<any> {
    const url = `${this.actionUrl}/${id}`
    return this._http.put<any>(url, {
      data: {
        ...entity
      }
    })
  }

  transformDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', this.locale)
  }
}
