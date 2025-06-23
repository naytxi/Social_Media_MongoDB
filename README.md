# # Proyecto Social Media 
### Segundo proyecto BackEnd BBK The Bridge.
![E-Commerce](https://i.pinimg.com/originals/e4/1c/7f/e41c7f79a42b21dc4b8f5f21a6f7236d.gif)

## ❓About

Este proyecto es una aplicación backend para un sistema de Red Social. Permite crear usuarios, añadir post, likes y comentarios, utilizando una API REST construida con Node.js y Mongoose para manejar la base de datos. También implementa autenticación mediante JSON Web Tokens (JWT) para seguridad y control de acceso.

## ⚙️ Tecnologías y Herramientas utilizadas

- **Node.js**: Plataforma de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construir APIs REST.
- **Mongoose**: ORM para manejar bases de datos SQL de forma sencilla.
- **MongDB** : Base de datos relacional para almacenar la información.
- **JWT (JSON Web Token)**: Para autenticación y autorización segura.
- **bcrypt**: Para hashear contraseñas de usuario.
- **Multer**: Middleware para subir y manejar imágenes de productos.
- **Nodemon**: Para reiniciar el servidor automáticamente en desarrollo.
- **Git**: Control de versiones y colaboración.
- **Postman**: Para probar endpoints de la API.

## 👀 Descripción del proyecto

Este proyecto fue desarrollado mediante el uso de ramas (branching) en Git para gestionar las diferentes funcionalidades y mantener el código organizado.

La API proporciona endpoints para:

- Crear, actualizar, eliminar y listar usuarios y sus posts.
- Gestionar usuarios y autenticación segura.
- Realizar comentarios y asociar autores a los mismos.
- Añadir likes e imagenes a los posts.
- Subir imágenes para los productos usando Multer.

## 🚀 Cómo ejecutar el proyecto localmente

Sigue estos pasos para clonar y correr el proyecto en tu máquina local:

1. Clonar el repositorio:
   
   git clone 
   cd res-social
   
2. Instalar dependencias:
    npm install

3. Configurar variables de entorno.

    Crea un archivo .env (si usas dotenv) con las variables necesarias, por ejemplo:

    DB_USER=tu_usuario
  
    DB_PASSWORD=tu_contraseña
  
    DB_NAME=nombre_de_la_base_de_datos
  
    JWT_SECRET=tu_secreto_jwt

  5. Inicia servidor:

     npm start

## 👥 Colaboradores

Nay
