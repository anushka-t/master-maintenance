import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';             

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/modules/material/material.module';
import { EntitiesComponent } from './entities/entities.component'; 
import { AbstractRestService } from './service/abstract-rest.service';
import { Department } from './department';
import { DepartmentService } from './service/department.service';
import { EmployeeService } from './service/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    EmployeesComponent,
    EntitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: 'departmentUrl', useValue: 'http://localhost:8080/api/department' },
    { provide: 'employeeUrl', useValue: 'http://localhost:8080/api/employee' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
