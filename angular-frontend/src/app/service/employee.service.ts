import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl: string;

  constructor(private http: HttpClient) { 
    this.employeeUrl = 'http://localhost:8080/api/employee'
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl);
  }

  public get(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  public delete(id: number): Observable<unknown> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.delete(url);
  }

  public create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, employee);
  }

  public update(employee: Employee): Observable<Employee> {
    const url = `${this.employeeUrl}/${employee.id}`;
    return this.http.post<Employee>(url, employee);
  }
}
