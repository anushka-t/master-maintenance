package jp.co.mimaze.lesson.exercise.web.repository;


import jp.co.mimaze.lesson.exercise.web.entity.Department;
import jp.co.mimaze.lesson.exercise.web.entity.Department_;
import org.seasar.doma.jdbc.Config;
import org.seasar.doma.jdbc.criteria.Entityql;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class DepartmentRepository {

    private final Entityql entityql;

    public DepartmentRepository(Config config) {
        Objects.requireNonNull(config);
        this.entityql = new Entityql(config);
    }

    public List<Department> selectAll() {
        var d = new Department_();
        return entityql.from(d).fetch();
    }

    public Department selectByID(Long id) {
        var d = new Department_();
        return entityql.from(d).where(c -> c.eq(d.id, id)).fetchOne();
    }

    public void insert(Department department) {
        var d = new Department_();
        entityql.insert(d, department).execute();
    }

    public void update(Department department) {
        var d = new Department_();
        entityql.update(d, department).execute();
    }

    public void delete(Department department) {
        var d = new Department_();
        entityql.delete(d, department).execute();
    }

    public List<Department> selectByQuery(String searchQuery) {
        var d = new Department_();
        return entityql.from(d).where(c -> c.like(d.nameFurigana, searchQuery+'%')).fetch();
    }

}
