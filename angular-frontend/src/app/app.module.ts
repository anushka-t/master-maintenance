import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';             

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './component/departments/departments.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MaterialModule } from './shared/modules/material/material.module';
import { EntitiesComponent } from './component/entities/entities.component'; 
import { AbstractRestService } from './service/abstract-rest.service';
import { Department } from './model/department';
import { DepartmentService } from './service/department.service';
import { EmployeeService } from './service/employee.service';
import { NestedParamPipe } from './pipe/nested-param.pipe';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    EmployeesComponent,
    EntitiesComponent,
    NestedParamPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    NestedParamPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
