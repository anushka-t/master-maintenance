package jp.co.mimaze.lesson.exercise.web.controller;


import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.entity.Employee;
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

@RequestMapping("/updateemp")
@Controller
public class UpdateEmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentService departmentService;

    @ModelAttribute
    public CreateForm createForm() {
        return new CreateForm();
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("dd/MM/yyyy"), true));
    }

    @GetMapping("/{id}")
    public String index(@PathVariable String id, Model model) {
        Employee emp = this.employeeService.selectByID(Long.parseLong(id));
        List<Department> depts = this.departmentService.selectAll();

        model.addAttribute("emp", emp);
        model.addAttribute("depts", depts);
        model.addAttribute("id", id);
        return "employee/update.html";
    }

    @PostMapping("/{id}")
    public String updateEmployee(@PathVariable String id, @Valid Employee employee, BindingResult bindingResult, Model model)
    {
        System.out.println("enter controller" + employee.toString());
        //Validation Error
        if(bindingResult.hasErrors()==true){
            bindingResult.getFieldErrors().forEach(e->{
                System.out.println(e.getField());
                System.out.println(e.getDefaultMessage());
            });
            return "redirect:/employee";
        }

        employeeService.update(Long.parseLong(id), employee.nameFurigana,employee.nameKanji,employee.email,employee.joiningDate,employee.deptID);
        return "redirect:/employee";
    }

}
