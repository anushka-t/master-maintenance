import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../department';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends AbstractRestService<Department> {
  constructor(private http: HttpClient,
    @Inject(LOCALE_ID) protected locale: string) {
    super(http, 'http://localhost:8080/api/department', locale)
  }
}
