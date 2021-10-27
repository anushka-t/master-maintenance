package jp.co.mimaze.lesson.exercise.web.entity;

import lombok.Data;
import org.seasar.doma.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Entity(metamodel = @Metamodel)
@Table(name = "Employee")
public class Employee {

    @Column(name = "EmpID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "EmpNameFurigana")
    public String nameFurigana;

    @Column(name = "EmpNameKanji")
    public String nameKanji;

    @Column(name = "EmpEmail")
    public String email;

    @Column(name = "EmpJoiningDate")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    public Date joiningDate;

    @Column(name = "DeptID")
    public Long deptID;

    @Transient
    public String deptNameFurigana;
}
