package jp.co.mimaze.lesson.exercise.web.controller;

import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.form.CreateForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;
import jp.co.mimaze.lesson.exercise.web.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RequestMapping("/create")
@Controller
public class CreateEmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentService departmentService;

    @ModelAttribute
    public CreateForm createForm() {
        return new CreateForm();
    }

    @GetMapping
    public String index(Model model) {
        List<Department> depts = this.departmentService.selectAll();
        model.addAttribute("depts", depts);
        return "employee/create.html";
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("dd/MM/yyyy"), true));
    }

    @PostMapping
    public String addEmployee(@Valid @ModelAttribute CreateForm createForm, BindingResult bindingResult)
    {
        System.out.println("entering controller" + createForm.getEmpEmail());
        if(bindingResult.hasErrors()==true) {
            bindingResult.getFieldErrors().forEach(e -> {
                System.out.println(e.getField());
                System.out.println(e.getDefaultMessage());
            });
            return "redirect:/employee";
        }

        CreateForm employee = createForm;
        employeeService.insert(
                employee.getEmpNameFurigana(),
                employee.getEmpNameKanji(),
                employee.getEmpEmail(),
                employee.getEmpJoiningDate(),
                employee.getDeptID());
        return "redirect:/employee";
    }

}