FROM node:20

# Crear el directorio de trabajo
WORKDIR /home/Login

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias
RUN npm install

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "./app.js"]