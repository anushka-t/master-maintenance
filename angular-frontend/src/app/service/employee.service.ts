import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../employee';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends AbstractRestService<Employee> {
  constructor(private http: HttpClient) { 
    super(http, 'http://localhost:8080/api/employee')
  }
}
