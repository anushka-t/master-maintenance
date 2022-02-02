import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Employee } from '../model/employee';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends AbstractRestService<Employee> {
  
  constructor(private http: HttpClient,
    @Inject(LOCALE_ID) protected locale: string) { 
    super(http, 'http://localhost:1337/api/employees', locale)
  }

  get(id: number): Observable<any> {
    let url = `http://localhost:1337/api/employees/${id}?populate=department`
    return this._http.get<any>(url).pipe(
      map(data => {
        let emp = data.data
        
        return {
          id: emp.id,
          nameFurigana: emp.attributes.nameFurigana,
          nameKanji: emp.attributes.nameKanji,
          email: emp.attributes.email,
          joiningDate: emp.attributes.joiningDate,
          department: emp.attributes.department.data.id,
          departmentName: emp.attributes.department.data.attributes.nameFurigana
        }
      })  
    )
  }
  
  getAll(): Observable<any> {
    let url = 'http://localhost:1337/api/employees?populate=department'
    return this._http.get<any>(url).pipe(
      map(data => {
        let emps = data.data
        emps = emps.map((emp: any) => {
          console.log(emp.attributes.department)
          return {
            id: emp.id,
            nameFurigana: emp.attributes.nameFurigana,
            nameKanji: emp.attributes.nameKanji,
            email: emp.attributes.email,
            joiningDate: emp.attributes.joiningDate,
            department: emp.attributes.department.data.id,
            departmentName: emp.attributes.department.data.attributes.nameFurigana
          }
          
        })
        return emps
      })  
    )
  }
}
