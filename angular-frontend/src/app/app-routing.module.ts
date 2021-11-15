import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { EntitiesComponent } from './entities/entities.component';

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
