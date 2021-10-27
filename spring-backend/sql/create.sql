drop database KENSHUU;
create database KENSHUU;
use KENSHUU;

drop table if exists Department;
create table Department(
	DeptID bigint not null primary key auto_increment,
	DeptNameFurigana VARCHAR(256) not null,
    DeptNameKanji VARCHAR(256) not null,
    DeptExtensionNumber VARCHAR(4) not null
);

drop table if exists Employee;
create table Employee(
	EmpID bigint not null primary key auto_increment,
	EmpNameFurigana VARCHAR(256) not null,
    EmpNameKanji VARCHAR(256) not null,
    EmpEmail VARCHAR(256) not null,
	EmpJoiningDate Date not null,
    DeptID bigint not null,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID) ON DELETE CASCADE,
    CreateUserID bigint not null default 0,
    UpdateUserID bigint not null default 0,
    CreateDatetime datetime default now(),
    UpdateDatetime datetime default now()
);

