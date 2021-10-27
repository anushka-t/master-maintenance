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

@RequestMapping("/updatedept")
@Controller
public class UpdateDepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @ModelAttribute
    public CreateDeptForm createDeptForm() {
        return new CreateDeptForm();
    }

    @GetMapping("/{id}")
    public String index(@PathVariable String id, Model model) {
        Department dept = this.departmentService.selectByID(Long.parseLong(id));

        model.addAttribute("id", id);
        model.addAttribute("dept", dept);
        return "department/update.html";
    }

    @PostMapping("/{id}")
    public String updateDepartment(@PathVariable String id, @Valid Department department, BindingResult bindingResult, Model model)
    {
        //Validation Error
        if(bindingResult.hasErrors()==true){
            bindingResult.getFieldErrors().forEach(e->{
                System.out.println(e.getField());
                System.out.println(e.getDefaultMessage());
            });
            return "redirect:/department";
        }

        departmentService.update(Long.parseLong(id), department.nameFurigana,department.nameKanji,department.extensionNumber);
        return "redirect:/department";
    }

}

