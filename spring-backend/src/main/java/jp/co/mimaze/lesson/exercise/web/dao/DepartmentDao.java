package jp.co.mimaze.lesson.exercise.web.dao;

import java.util.List;

import jp.co.mimaze.lesson.exercise.web.entity.Department;

import org.seasar.doma.*;
import org.seasar.doma.boot.ConfigAutowireable;

@ConfigAutowireable
@Dao
public interface DepartmentDao {
  
  @Insert
  int insert(Department department);

   @Select
   List<Department> selectAll();

   @Select
   Department selectByID(Long deptID);

   @Select
   List<Department> selectByQuery(String searchQuery);

    @Update
    int update(Department department);

    @Delete
    int delete(Department department);

}
