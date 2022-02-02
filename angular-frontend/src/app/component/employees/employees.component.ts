import { Component, OnInit } from '@angular/core';
import { NestedParamPipe } from 'src/app/pipe/nested-param.pipe';
import { Employee } from '../../model/employee';
import { DepartmentService } from '../../service/department.service';
import { EmployeeService } from '../../service/employee.service';
import { EntitiesComponent } from '../entities/entities.component';

@Component({
  selector: 'app-employees',
  templateUrl: '../entities/entities.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent extends EntitiesComponent<Employee> implements OnInit {

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, protected nestedParamPipe: NestedParamPipe) { 
    super(employeeService, nestedParamPipe, [
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
        name: "department",
        displayName: "Dept Name",
        formField: "select",
        options: [],
        display: false,
      },
      {
        name: 'departmentName',
        displayName: "Dept Name",
        type: "text",
        display: true
      }
    ])
  }

  ngOnInit(): void {
    super.ngOnInit()
    let deptAttribute = this.attributes.find(attr => attr.name === 'department')
    this.departmentService.getAll().subscribe(data => {
      deptAttribute.options = data.map((dept: any) => ({
        name: dept.nameFurigana,
        value: dept.id
      }))
    })
    console.log(this.attributes)

  }

}
