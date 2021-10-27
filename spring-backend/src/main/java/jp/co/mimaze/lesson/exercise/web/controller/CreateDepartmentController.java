package jp.co.mimaze.lesson.exercise.web.controller;

import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.form.CreateDeptForm;
import jp.co.mimaze.lesson.exercise.web.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RequestMapping("/createdept")
@Controller

public class CreateDepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @ModelAttribute
    public CreateDeptForm createDeptForm() {
        return new CreateDeptForm();
    }

    @GetMapping
    public String index() {
        return "department/create.html";
    }

    @PostMapping
    public String addDepartment(@Valid Department department, BindingResult bindingResult, Model model)
    {
        System.out.println(department.toString());
        //Validation Error
        if(bindingResult.hasErrors()==true){
            bindingResult.getFieldErrors().forEach(e->{
                System.out.println(e.getField());
                System.out.println(e.getDefaultMessage());
            });
            return "redirect:/department";
        }


        departmentService.insert(department.nameFurigana,department.nameKanji,department.extensionNumber);
        return "redirect:/department";

    }


}