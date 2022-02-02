import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../model/department';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends AbstractRestService<Department> {
  constructor(private http: HttpClient,
    @Inject(LOCALE_ID) protected locale: string) {
    super(http, 'http://localhost:1337/api/departments', locale)
  }

  get(id: number): Observable<any> {
    let url = `${this.actionUrl}/${id}`
    return this._http.get<any>(url).pipe(
      map(data => {
        let dept = data.data
       
        return {
          id: dept.id,
          nameFurigana: dept.attributes.nameFurigana,
          nameKanji: dept.attributes.nameKanji,
          extensionNumber: dept.attributes.extensionNumber
        }
          
      })  
    )
  }

  getAll(): Observable<any> {
    return this._http.get<any>(this.actionUrl).pipe(
      map(data => {
        let depts = data.data
        depts = depts.map((dept: any) => {
          console.log(dept.attributes.department)
          return {
            id: dept.id,
            nameFurigana: dept.attributes.nameFurigana,
            nameKanji: dept.attributes.nameKanji,
            extensionNumber: dept.attributes.extensionNumber
          }
          
        })
        return depts
      })  
    )
  }
}
