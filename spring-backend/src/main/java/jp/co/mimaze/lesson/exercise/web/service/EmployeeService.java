package jp.co.mimaze.lesson.exercise.web.service;

import jp.co.mimaze.lesson.exercise.web.dao.EmployeeDao;
import jp.co.mimaze.lesson.exercise.web.entity.Employee;
import jp.co.mimaze.lesson.exercise.web.entity.EmployeeSearch;
import jp.co.mimaze.lesson.exercise.web.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

    private Logger logger = LoggerFactory.getLogger(EmployeeService.class);
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> selectAll() {
        logger.info("select all employee call");
        List<Employee> emps = employeeRepository.selectAll();
        return emps;
    }

    public Employee selectByID(Long id) {
        logger.info("selectbyID employee call");
        Employee emp = employeeRepository.selectByID(id);
        return emp;
    }

    public List<Employee> selectByQuery(String searchQuery) {
        logger.info("selectByQuery employee call");
        List<Employee> emps = employeeRepository.selectByQuery(searchQuery);
        return emps;
    }

    public void delete(Long empID) {
        logger.info("delete emp call");
        Employee employee = employeeRepository.selectByID(empID);
        employeeRepository.delete(employee);
    }

    public void insert(String empNameFurigana, String empNameKanji, String empEmail, Date empJoiningDate, Long deptID) {
        logger.info("insert call");
        Employee employee = new Employee();
        employee.nameFurigana = empNameFurigana;
        employee.nameKanji = empNameKanji;
        employee.email = empEmail;
        employee.joiningDate = empJoiningDate;
        employee.deptID=deptID;

        employeeRepository.insert(employee);
    }

    public void update(Long id, String empNameFurigana, String empNameKanji, String empEmail, Date empJoiningDate,Long deptID) {
        logger.info("update call");

        Employee employee = employeeRepository.selectByID(id);
        employee.nameFurigana = empNameFurigana;
        employee.nameKanji = empNameKanji;
        employee.email = empEmail;
        employee.joiningDate = empJoiningDate;
        employee.deptID = deptID;

        employeeRepository.update(employee);
    }

}
