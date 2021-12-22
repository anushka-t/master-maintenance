import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './component/departments/departments.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { EntitiesComponent } from './component/entities/entities.component';

const routes: Routes = [
  {path: 'departments', component: DepartmentsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'entities', component: EntitiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
