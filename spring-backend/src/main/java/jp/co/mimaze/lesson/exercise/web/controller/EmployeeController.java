package jp.co.mimaze.lesson.exercise.web.controller;

import jp.co.mimaze.lesson.exercise.web.entity.Employee;
import jp.co.mimaze.lesson.exercise.web.entity.EmployeeSearch;
import jp.co.mimaze.lesson.exercise.web.form.SearchForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;
import jp.co.mimaze.lesson.exercise.web.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    private DepartmentService departmentService;

    @Autowired
    public EmployeeController(EmployeeService employeeService, DepartmentService departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
    }

    @ModelAttribute
    public SearchForm createSearchForm(SearchForm searchForm) {
        return searchForm;
    }

    @GetMapping
    public String index(Model model) {
        List<Employee> emps = this.employeeService.selectAll();
        model.addAttribute("emps", emps);
        return "employee/index.html";
    }

    @PostMapping("/search")
    public String search(SearchForm searchForm, Model model) {
        String searchQuery = searchForm.getSearchQuery();
        List<Employee> emps = this.employeeService.selectByQuery(searchQuery);
        model.addAttribute("emps", emps);
        return "employee/index.html";
    }

    @GetMapping("/delete/{id}")
    public String deleteDepartment(@PathVariable String id, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors() == true) {
            bindingResult.getFieldErrors().forEach(e -> {
                System.out.println(e.getField());
                System.out.println(e.getDefaultMessage());
            });
            return "redirect:/employee";
        }

        this.employeeService.delete(Long.parseLong(id));
        return "redirect:/employee";
    }

}
