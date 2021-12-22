import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends AbstractRestService<Employee> {
  constructor(private http: HttpClient,
    @Inject(LOCALE_ID) protected locale: string) { 
    super(http, 'http://localhost:1337/employees', locale)
  }
}
