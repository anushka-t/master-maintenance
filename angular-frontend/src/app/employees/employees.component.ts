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
    super(employeeService, [
      {
        name: "nameFurigana",
        displayName: "Name",
        formField: "input",
        type: "text",
        display: true,
      },
      {
        name: "nameKanji",
        displayName: "Name Kana",
        formField: "input",
        type: "text",
        display: true,
      },
      {
        name: "email",
        displayName: "Email",
        formField: "input",
        type: "email",
        display: true,
      },
      {
        name: "joiningDate",
        displayName: "Joining Date",
        formField: "input",
        type: "date",
        display: true,
        pipe: 'date'
      },
      {
        name: "deptID",
        displayName: "Dept Name",
        formField: "select",
        options: [],
        display: false,
      },
      {
        name: "deptNameFurigana",
        displayName: "Dept Name",
        display: true
      }
    ])
  }

  ngOnInit(): void {
    super.ngOnInit()
    let deptAttribute = this.attributes.find(attr => attr.name === 'deptID')
    this.departmentService.getAll().subscribe(data => {
      deptAttribute.options = data.map(dept => ({
        name: dept.nameFurigana,
        value: dept.id
      }))
    })
  }

}
