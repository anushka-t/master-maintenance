import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { Department } from '../department';
import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  columnsToDisplay: string[] = ['nameFurigana', 'nameKanji', 'email', 'joiningDate', 'deptNameFurigana', 'editButton', 'deleteButton']
  employees: Employee[]
  departments: Department[]
  showCreateForm: boolean = false
  showUpdateForm: boolean = false
  newEmployeeForm = new FormGroup({
    nameFurigana: new FormControl('', Validators.required),
    nameKanji: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    joiningDate: new FormControl(new Date(), Validators.required),
    deptID: new FormControl(0, Validators.required)
  })
  updatedEmployee = new FormGroup({
    id: new FormControl(0),
    nameFurigana: new FormControl(''),
    nameKanji: new FormControl(''),
    email: new FormControl(''),
    joiningDate: new FormControl(new Date()),
    deptID: new FormControl(0)
  })

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.employeeService.findAll().subscribe(data => {
      this.employees = data;
    });
    this.departmentService.findAll().subscribe(data => {
      this.departments = data;
    });
  }

  get newEmployee() { return this.newEmployeeForm.controls }

  setShowCreateForm(state: boolean) {
    this.showCreateForm = state
  }
  setShowUpdateForm(state: boolean) {
    this.showUpdateForm = state
  }

  update(id: number): void {
    this.setShowUpdateForm(true)
    this.employeeService.get(id).subscribe(data => {
      console.log(data)
      this.updatedEmployee.setValue(data)
    })
  }

  delete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      console.log("user deleted")
      window.location.reload()
    })
  }

  onCreate() {
    this.employeeService.create(this.newEmployeeForm.value).subscribe(() => {
      console.log('new emp created')
      window.location.reload()
    })
  }

  onUpdate() {
    this.employeeService.update(this.updatedEmployee.value).subscribe(() => {
      console.log('emp updated')
      window.location.reload()
    })
  }

}
