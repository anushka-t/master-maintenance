import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../department';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends AbstractRestService<Department> {
  constructor(private http: HttpClient) {
    super(http, 'http://localhost:8080/api/department')
  }
}
