package jp.co.mimaze.lesson.exercise.web.form;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CreateDeptForm {

    @NotNull
    public String deptNameFurigana;

    @NotNull
    public String deptNameKanji;

    @NotNull
    public String deptExtensionNumber;
}
