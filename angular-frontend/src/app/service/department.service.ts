import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentUrl: string;

  constructor(private http: HttpClient) {
    this.departmentUrl = 'http://localhost:8080/api/department';
  }

  public findAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentUrl);
  }

  public get(id: number) : Observable<Department> {
    const url = `${this.departmentUrl}/${id}`;
    return this.http.get<Department>(url);
  }

  public delete(id: number): Observable<unknown> {
    const url = `${this.departmentUrl}/${id}`;
    return this.http.delete(url);
  }

  public create(department: Department): Observable<Department> {
    return this.http.post<Department>(this.departmentUrl, department);
  }

  public update(department: Department): Observable<Department> {
    const url = `${this.departmentUrl}/${department.id}`; 
    return this.http.post<Department>(url, department);
  } 
  
}
