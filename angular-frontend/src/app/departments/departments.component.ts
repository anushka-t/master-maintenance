import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../department';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[];
  showCreateForm: boolean = false;
  showUpdateForm: boolean = false;
  newDepartmentForm: FormGroup
  updatedDepartment = new FormGroup({
    id: new FormControl(0),
    nameFurigana: new FormControl(''),
    nameKanji: new FormControl(''),
    extensionNumber: new FormControl('0000'),
  })

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentService.findAll().subscribe(data => {
      this.departments = data;  
    });

    this.newDepartmentForm = new FormGroup({
      nameFurigana: new FormControl('', Validators.required),
      nameKanji: new FormControl('', Validators.required),
      extensionNumber: new FormControl('', Validators.required),
    });
    
  }

  get newDepartment() { return this.newDepartmentForm.controls }
  get nameFurigana() { return this.newDepartmentForm.get('nameFurigana') }
  get nameKanji() { return this.newDepartmentForm.get('nameKanji') }
  get extensionNumber() { return this.newDepartmentForm.get('extensionNumber') }


  setShowCreateForm(state: boolean) {
    this.showCreateForm = state;
  }
  setShowUpdateForm(state: boolean) {
    this.showUpdateForm = state;
  }

  update(id: number): void {
    this.setShowUpdateForm(true)
    this.departmentService.get(id).subscribe(data => {
      this.updatedDepartment.setValue(data)
    })
  }

  delete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      console.log("dept deleted")
      window.location.reload()
    })
  }

  onCreate() {
    this.departmentService.create(this.newDepartmentForm.value).subscribe(() => {
      console.log('new dept created')
      window.location.reload()
    })
  }

  onUpdate() {
    this.departmentService.update(this.updatedDepartment.value).subscribe(() => {
      console.log('dept updated')
      window.location.reload()
    })
  }
}
