package jp.co.mimaze.lesson.exercise.web.api.controller;

import java.util.List;

import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.form.SearchForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/department")
@RestController("APIDepartmentController")
@CrossOrigin(origins = "http://localhost:4200")
public class DepartmentController {
  private DepartmentService departmentService;

  @Autowired
  public DepartmentController(DepartmentService departmentService) {
      this.departmentService = departmentService;
  }

  @GetMapping
  public List<Department> index() {
    List<Department> depts = this.departmentService.selectAll();
    return depts;
  }

  @PostMapping 
  public void insert(@RequestBody Department department) {
    this.departmentService.insert(department.nameFurigana, department.nameKanji, department.extensionNumber);
  }

  @GetMapping("/{id}")
  public Department selectByID(@PathVariable Long id) {
    return this.departmentService.selectByID(id);
  }

  @PostMapping("/{id}")
  public void update(@PathVariable Long id, @RequestBody Department department) {
    this.departmentService.update(id, 
                                  department.getNameFurigana(), 
                                  department.getNameKanji(), 
                                  department.getExtensionNumber());
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    this.departmentService.delete(id);
  }
}
