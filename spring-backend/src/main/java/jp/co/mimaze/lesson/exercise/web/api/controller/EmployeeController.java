package jp.co.mimaze.lesson.exercise.web.api.controller;

import java.util.List;

import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.entity.Employee;
import jp.co.mimaze.lesson.exercise.web.form.SearchForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;
import jp.co.mimaze.lesson.exercise.web.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/employee")
@RestController("APIEmployeeController")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
  private EmployeeService employeeService; 

  public EmployeeController(EmployeeService employeeService) {
      this.employeeService = employeeService;
  }

  @GetMapping
  public List<Employee> index() {
    List<Employee> emps = this.employeeService.selectAll();
    return emps;
  }

  @PostMapping
  public void create(@RequestBody Employee employee)  {
    this.employeeService.insert(employee.getNameFurigana(), 
                                employee.getNameKanji(), 
                                employee.getEmail(), 
                                employee.getJoiningDate(), 
                                employee.getDeptID());
  }

  @GetMapping("/{id}")
  public Employee selectByID(@PathVariable Long id) {
    return this.employeeService.selectByID(id);
  }

  @PostMapping("/{id}")
  public void update(@PathVariable Long id, @RequestBody Employee employee) {
    this.employeeService.update(id, 
                                employee.getNameFurigana(), 
                                employee.getNameKanji(), 
                                employee.getEmail(), 
                                employee.getJoiningDate(), 
                                employee.getDeptID());
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    this.employeeService.delete(id);
  }

}
