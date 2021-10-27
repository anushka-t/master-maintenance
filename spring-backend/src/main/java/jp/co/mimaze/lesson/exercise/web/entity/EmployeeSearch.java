package jp.co.mimaze.lesson.exercise.web.entity;

import lombok.Data;
import org.seasar.doma.Entity;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Entity
public class EmployeeSearch {

    private Long id;

    private String nameFurigana;

    private String nameKanji;

    private String email;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date joiningDate;

    private String deptNameFurigana;

}
