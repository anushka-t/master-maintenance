package jp.co.mimaze.lesson.exercise.web.dao;

import jp.co.mimaze.lesson.exercise.web.entity.Employee;
import jp.co.mimaze.lesson.exercise.web.entity.EmployeeSearch;
import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

import java.util.List;
import java.util.Map;

@ConfigAutowireable
@Dao
public interface EmployeeDao {

    @Select
    List<EmployeeSearch> selectAll();

    @Select
    Employee selectByID(Long empID);

    @Select
    List<EmployeeSearch> selectByQuery(String searchQuery);

    @Insert
    int insert(Employee employee);

    @Update
    int update(Employee employee);

    @Delete
    int delete(Employee employee);

}
