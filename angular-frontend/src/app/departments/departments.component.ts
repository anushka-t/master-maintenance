import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Department } from '../department';
import { EntitiesComponent } from '../entities/entities.component';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: '../entities/entities.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent extends EntitiesComponent<Department> implements OnInit {

  constructor(private departmentService: DepartmentService) { 
    super(departmentService, ['nameFurigana', 'nameKanji', 'extensionNumber'])
  }

}
