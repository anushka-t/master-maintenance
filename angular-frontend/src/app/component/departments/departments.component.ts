import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Department } from '../../model/department';
import { EntitiesComponent } from '../entities/entities.component';
import { DepartmentService } from '../../service/department.service';
import { NestedParamPipe } from 'src/app/pipe/nested-param.pipe';

@Component({
  selector: 'app-departments',
  templateUrl: '../entities/entities.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent extends EntitiesComponent<Department> implements OnInit {

  constructor(private departmentService: DepartmentService, protected nestedParamPipe: NestedParamPipe) { 
    super(departmentService, nestedParamPipe, [
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
        name: "extensionNumber",
        displayName: "Extension No",
        formField: "input",
        type: "number",
        display: true,
      }
    ])
  }

}
