package jp.co.mimaze.lesson.exercise.web.repository;

import jp.co.mimaze.lesson.exercise.web.entity.Department_;
import jp.co.mimaze.lesson.exercise.web.entity.Employee;
import jp.co.mimaze.lesson.exercise.web.entity.EmployeeSearch;
import jp.co.mimaze.lesson.exercise.web.entity.Employee_;
import org.seasar.doma.jdbc.Config;
import org.seasar.doma.jdbc.criteria.Entityql;
import org.seasar.doma.jdbc.criteria.option.LikeOption;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class EmployeeRepository {

    private final Entityql entityql;

    public EmployeeRepository(Config config) {
        Objects.requireNonNull(config);
        this.entityql = new Entityql(config);
    }

    public List<Employee> selectAll() {
        var e = new Employee_();
        var d = new Department_();

        List<Employee> list = entityql
                .from(e)
                .innerJoin(d, on -> on.eq(e.deptID, d.id))
                .associate(
                        e,
                        d,
                        (employee, department) -> {
                            employee.setDeptID(department.getId());
                            employee.setDeptNameFurigana(department.getNameFurigana());
                        }
                ).fetch();
        return list;
    }

    public Employee selectByID(Long id) {
        var e = new Employee_();
        return entityql.from(e).where(c -> c.eq(e.id, id)).fetchOne();
    }

    public List<Employee> selectByQuery(String searchQuery) {
        Employee_ e = new Employee_();
        Department_ d = new Department_();

        List<Employee> list = entityql
                .from(e)
                .innerJoin(d, on -> on.eq(e.deptID, d.id))
                .where(c -> c.like(e.email, searchQuery, LikeOption.infix()))
                .where(c -> c.or(() -> c.like(d.nameFurigana, searchQuery, LikeOption.prefix())))
                .associate(
                        e,
                        d,
                        (employee, department) -> {
                            employee.setDeptID(department.getId());
                            employee.setDeptNameFurigana(department.getNameFurigana());
                        }
                ).fetch();

        return list;
    }

    public void insert(Employee employee) {
        var e = new Employee_();
        entityql.insert(e, employee).execute();
    }

    public void update(Employee employee) {
        var e = new Employee_();
        entityql.update(e, employee).execute();
    }

    public void delete(Employee employee) {
        var e = new Employee_();
        entityql.delete(e, employee).execute();
    }
}
