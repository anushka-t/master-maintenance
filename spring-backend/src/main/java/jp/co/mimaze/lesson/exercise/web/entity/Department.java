package jp.co.mimaze.lesson.exercise.web.entity;

import lombok.Data;
import org.seasar.doma.*;

@Data
@Entity(metamodel = @Metamodel)
@Table(name = "Department")
public class Department {
  
  @Column(name = "DeptID")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;

  @Column(name = "DeptNameFurigana")
  public String nameFurigana;

  @Column(name = "DeptNameKanji")
  public String nameKanji;

  @Column(name = "DeptExtensionNumber")
  public String extensionNumber;

}
