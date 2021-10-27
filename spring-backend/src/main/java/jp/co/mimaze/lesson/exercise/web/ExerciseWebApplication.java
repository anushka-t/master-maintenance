package jp.co.mimaze.lesson.exercise.web;

// import com.example.dao.DepartmentDaoImpl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(value = {"com.example","jp.co.mimaze.lesson.exercise.web"})
@SpringBootApplication
public class ExerciseWebApplication {

	public static void main(String[] args) {
	    SpringApplication.run(ExerciseWebApplication.class, args);
	}

}
