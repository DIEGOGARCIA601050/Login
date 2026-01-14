create database usuarios;
USE usuarios;
CREATE TABLE registrados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(255),
  edad INT,
  imagen varchar(255)
);
