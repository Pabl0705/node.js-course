# Curso de Node.js + API REST + MySQL

Este repositorio contiene los ejercicios y proyectos desarrollados durante mi aprendizaje de Node.js, la creación de APIs REST y la integración con MySQL.

## Objetivo

El objetivo de este repositorio es documentar mi progreso en el aprendizaje de Node.js, la creación de APIs RESTful, y el manejo de bases de datos MySQL. También sirve como un punto de partida para futuras mejoras y ampliaciones.

## Contenidos

- Configuración básica de un servidor en Node.js
- Creación de una API REST con **Express**
- Conexión y manejo de bases de datos relacionales usando **MySQL**
- Uso de **Postman** para pruebas de endpoints
- Implementación de **CRUD** (Crear, Leer, Actualizar, Eliminar)
- Autenticación y manejo de sesiones

## Tecnologías

- **Node.js**
- **Express**
- **MySQL**
- **Postman/Insomnia** (para pruebas)
- **Sequelize** (ORM opcional)

## Requisitos

Para ejecutar el código localmente, necesitarás:

- Node.js v14+
- MySQL v8+
- npm v6+

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/usuario/curso-node-api-mysql.git
    ```

2. Instala las dependencias necesarias:
    ```bash
    cd curso-node-api-mysql
    npm install
    ```

3. Configura la conexión a MySQL en el archivo `.env`:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_de_la_bd
    ```

4. Crea la base de datos en MySQL y ejecuta las migraciones (si usas Sequelize):
    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicia el servidor:
    ```bash
    npm start
    ```

## Progreso del curso

1. **Introducción a Node.js**
    - Instalación y configuración
    - Servidor básico
2. **API REST con Express**
    - Rutas y controladores
    - Gestión de peticiones y respuestas
3. **Integración con MySQL**
    - Configuración de conexión a la base de datos
    - Operaciones CRUD
4. **Pruebas de API con Postman**
    - Realización de pruebas con diferentes endpoints
5. **Autenticación y seguridad**

## Contribuciones

Este es un repositorio personal de aprendizaje, pero si tienes sugerencias o quieres compartir recursos adicionales, ¡las contribuciones son bienvenidas!

## Licencia

Este repositorio es de uso personal y no tiene licencia específica.
