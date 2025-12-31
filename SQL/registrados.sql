USE usuarios;

-- crear tabla registrados con los campos nombre, apellido, correo, contrasena y edad
CREATE TABLE registrados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    edad INT NOT NULL
    imagen VARCHAR(50),
);
