create database usuarios;
use usuarios;
create table registrados (
	id int auto_increment not null ,
    nombre varchar(255),
    apellido varchar(255),
    contraseña varchar(255),
    edad int,
    primary key (id)
);

insert into registrados(nombre, apellido, contraseña, edad) values ('dan', 'lee', '9Y4HTRU9', 17);
insert into registrados(nombre, apellido, contraseña, edad)
values ('Maria', 'Garza', 'r9Yr4rHrTReU9ad', 25),
       ('Maria', 'Nuñez', 'r9Y74rH5T3eU3ad', 25),
       ('justino', 'comedia', '9Y4HTRU9', 42),
	   ('Daniela', 'Marquez', 'r9Yr4r4f83jd8HrTReU9ad', 12);
insert into registrados(nombre, apellido, contraseña, edad)
values ('justino', 'comedia', '9Y4HTRU9', 42);
insert into registrados(nombre, apellido, contraseña, edad) values ('juan','guzman', '9Y4HTRU9', 42);       

SELECT * FROM registrados;
SELECT * FROM registrados WHERE edad>=25 AND nombre='Maria';
SELECT * FROM registrados WHERE edad>16;
SELECT * FROM registrados WHERE edad<18;
update registrados set nombre = 'Luis' where id = 2;
update registrados set edad = 18 where id = 7;
SELECT * FROM registrados WHERE id=2;
select * from registrados limit 2;
select * from registrados where edad >= 18;
select * from registrados where edad >= 21;
SELECT * FROM registrados WHERE edad>=17 AND nombre='Maria';
select nombre,apellido from registrados;
select nombre,apellido from registrados where edad >=18;
select * from registrados order by contraseña, id asc;
select * from registrados order by contraseña, id desc;
select distinct contraseña from registrados;
select distinct contraseña from registrados order by rand();


DELETE FROM registrados WHERE id=5;