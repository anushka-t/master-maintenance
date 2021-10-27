/** 専用スキーマの削除・追加 */
DROP SCHEMA IF EXISTS lesson_exercise;
CREATE SCHEMA lesson_exercise CHARACTER SET 'utf8mb4';

/** 専用ユーザーの削除・追加 */
DROP USER IF EXISTS 'lesson_exercise_user'@'localhost';
CREATE USER 'lesson_exercise_user'@'localhost' IDENTIFIED BY 'lesson_exercise_user';

/** 専用ユーザーに権限を付与 */
GRANT ALL ON lesson_exercise.* TO 'lesson_exercise_user'@'localhost';

/** MySQLWorkbenchでtable等の一覧を見られるようにする為権限を付与 */
GRANT SELECT ON performance_schema.user_variables_by_thread TO 'lesson_exercise_user'@'localhost';