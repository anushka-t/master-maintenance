package jp.co.mimaze.lesson.exercise.web.service;

import java.util.List;

import jp.co.mimaze.lesson.exercise.web.dao.DepartmentDao;
import jp.co.mimaze.lesson.exercise.web.entity.Department;

import jp.co.mimaze.lesson.exercise.web.repository.DepartmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {

  private Logger logger = LoggerFactory.getLogger(DepartmentService.class);
  private final DepartmentRepository departmentRepository;

  public DepartmentService(DepartmentRepository departmentRepository) {
      this.departmentRepository = departmentRepository;
  }

   public List<Department> selectAll() {
     logger.info("select all dept call");
     List<Department> depts = departmentRepository.selectAll();
     return depts;
   }

   public Department selectByID(Long deptID) {
    logger.info("selectByID dept call");
    Department dept = departmentRepository.selectByID(deptID);
    return dept;
   }

   public List<Department> selectByQuery(String searchQuery) {
      logger.info("selectByQuery dept call");
      List<Department> depts = departmentRepository.selectByQuery(searchQuery);
      return depts;
   }

    public void insert(String deptNameFurigana, String deptNameKanji, String deptExtensionNumber) {
        logger.info("insert call");
        Department department = new Department();
        department.nameFurigana = deptNameFurigana;
        department.nameKanji=deptNameKanji;
        department.extensionNumber=deptExtensionNumber;

        departmentRepository.insert(department);
    }

    public void update(Long id, String deptNameFurigana, String deptNameKanji, String deptExtensionNumber) {
        logger.info("update call");
        Department department = departmentRepository.selectByID(id);
        department.nameFurigana = deptNameFurigana;
        department.nameKanji=deptNameKanji;
        department.extensionNumber=deptExtensionNumber;

        departmentRepository.update(department);
    }

    public void delete(Long deptID) {
       logger.info("delete dept call");
       Department department = departmentRepository.selectByID(deptID);
       departmentRepository.delete(department);
    }

}
