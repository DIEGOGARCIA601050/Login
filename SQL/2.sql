use usuarios;
create table `cursos` (
	id_curso int NOT NULL auto_increment,
    nombre_curso text,
    nombre_profesor text,
    costo int,
    id int,
    primary key (id_curso)
    );

insert into cursos (nombre_curso, nombre_profesor, costo, id) 
values ('curso de python', 'dalto', 200, 3),
	   ('curso de javascript', 'midudev', 100, 8),
       ('curso de sql', 'hola mundo', 150, 1),
       ('curso de git y github', 'mouredev', 220, 6);

select * from cursos;
select * from cursos, registrados;
select cursos.nombre_curso, registrados.id from cursos
inner join registrados on registrados.id = cursos.id;
select cursos.*, registrados.nombre from cursos
inner join registrados on registrados.id = cursos.id;
select cursos.*, registrados.nombre from cursos
inner join registrados on registrados.id = cursos.id order by cursos.costo;
select id from cursos;
select id from registrados;
select * from cursos order by id;