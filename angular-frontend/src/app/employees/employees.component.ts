import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';
import { EntitiesComponent } from '../entities/entities.component';

@Component({
  selector: 'app-employees',
  templateUrl: '../entities/entities.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent extends EntitiesComponent<Employee> implements OnInit {

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) { 
    super(employeeService, ['nameFurigana', 'nameKanji', 'email', 'joiningDate', 'deptNameFurigana'])
  }

}
