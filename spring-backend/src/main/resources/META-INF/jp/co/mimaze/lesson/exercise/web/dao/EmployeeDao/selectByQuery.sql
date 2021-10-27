select Employee.EmpID as id,
       Employee.EmpNameFurigana as nameFurigana,
       Employee.EmpNameKanji as nameKanji,
       Employee.EmpEmail as email,
       Employee.EmpJoiningDate as joiningDate,
       Department.DeptNameFurigana as deptNameFurigana
from Employee inner join Department on (Employee.DeptID = Department.DeptID) where
Employee.EmpEmail like /* '%'+searchQuery+'%' */'%mi%'
or
Department.DeptNameFurigana like  /* searchQuery+'%' */'dept%'