package jp.co.mimaze.lesson.exercise.web.form;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
public class CreateForm {

    @NotNull
    private String empNameFurigana;

    @NotNull
    private String empNameKanji;

    @NotNull
    private String empEmail;

    @NotNull
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date empJoiningDate;

    @NotNull
    private Long deptID;
}