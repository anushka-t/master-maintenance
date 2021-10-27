package jp.co.mimaze.lesson.exercise.web.controller;

import java.util.List;

import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.form.SearchForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/department")
@Controller 
public class DepartmentController {
  

  private DepartmentService departmentService;

  @Autowired
  public DepartmentController(DepartmentService departmentService) {
      this.departmentService = departmentService;
  }

  @ModelAttribute
  public SearchForm createSearchForm(SearchForm searchForm) {
      return searchForm;
  }

   @GetMapping
   public String index(Model model) {
     List<Department> depts = this.departmentService.selectAll();
     model.addAttribute("depts", depts);
     return "department/index.html";
   }

   @PostMapping("/search")
   public String search(SearchForm searchForm, Model model) {
      String searchQuery = searchForm.getSearchQuery();
      List<Department> depts = this.departmentService.selectByQuery(searchQuery);

      model.addAttribute("depts", depts);
      return "department/index.html";
   }

    @GetMapping("/delete/{id}")
    public String deleteDepartment(@PathVariable String id, BindingResult bindingResult, Model model) {
      if (bindingResult.hasErrors() == true) {
          bindingResult.getFieldErrors().forEach(e -> {
              System.out.println(e.getField());
              System.out.println(e.getDefaultMessage());
          });
          return "redirect:/department";
      }

      this.departmentService.delete(Long.parseLong(id));
      return "redirect:/department";
    }
}
