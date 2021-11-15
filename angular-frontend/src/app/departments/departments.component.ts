import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../department';
import { EntitiesComponent } from '../entities/entities.component';
import { AbstractRestService } from '../service/abstract-rest.service';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  providers: [
    { 
      provide: 'actionUrl',
      useValue: 'http://localhost:8080/api/department'
    },  
    {
      provide: 'test',
      useFactory: (http: HttpClient) => (new AbstractRestService<Department>(http, 'http://localhost:8080/api/department')),
      deps: [HttpClient]
    }
  ]
})
export class DepartmentsComponent implements OnInit {

  columnsToDisplay: string[] = ['nameFurigana', 'nameKanji', 'extensionNumber', 'editButton', 'deleteButton']
  departments: Department[]
  showCreateForm: boolean = false
  showUpdateForm: boolean = false
  newDepartmentForm = new FormGroup({
    nameFurigana: new FormControl('', Validators.required),
    nameKanji: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    joiningDate: new FormControl(new Date(), Validators.required),
    deptID: new FormControl(0, Validators.required)
  })
  updatedDepartment = new FormGroup({
    id: new FormControl(0),
    nameFurigana: new FormControl(''),
    nameKanji: new FormControl(''),
    email: new FormControl(''),
    joiningDate: new FormControl(new Date()),
    deptID: new FormControl(0)
  })

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
  }

  get newDepartment() { return this.newDepartmentForm.controls }

  setShowCreateForm(state: boolean) {
    this.showCreateForm = state
  }
  setShowUpdateForm(state: boolean) {
    this.showUpdateForm = state
  }

  update(id: number): void {
    this.setShowUpdateForm(true)
    this.departmentService.get(id).subscribe(data => {
      console.log(data)
      this.updatedDepartment.setValue(data)
    })
  }

  delete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      console.log("user deleted")
      window.location.reload()
    })
  }

  onCreate() {
    this.departmentService.create(this.newDepartmentForm.value).subscribe(() => {
      console.log('new emp created')
      window.location.reload()
    })
  }

  onUpdate() {
    this.departmentService.update(this.updatedDepartment.value.id, this.updatedDepartment.value).subscribe(() => {
      console.log('emp updated')
      window.location.reload()
    })
  }
}
