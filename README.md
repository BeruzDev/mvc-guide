# Guía paso a paso para crear un proyecto con arquitectura MVC en Node.js y Express

Este repositorio es una guía detallada para crear un proyecto siguiendo la arquitectura **Modelo-Vista-Controlador (MVC)** utilizando **Node.js** con **Express**. A lo largo del proceso, se demostrará cómo trabajar con diferentes bases de datos: **una local**, **MongoDB** y **MySQL**, para ilustrar la flexibilidad de la separación entre modelos y controladores.

## Requisitos previos
Antes de comenzar, asegúrate de tener instalado:
- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **Git**: [Descargar Git](https://git-scm.com/)
- **MongoDB** (si deseas usar la base de datos en local): [Descargar MongoDB](https://www.mongodb.com/try/download/community)
- **MySQL** (si deseas usar MySQL en local): [Descargar MySQL](https://dev.mysql.com/downloads/installer/)

---

## Pasos para crear el proyecto

### 1. Inicializar el proyecto con `pnpm`

Para una mejor optimización de paquetes, usaremos `pnpm` en lugar de `npm` o `yarn`. Si no lo tienes instalado, ejecuta:
```sh
npm install -g pnpm
```
Luego, inicializa un nuevo proyecto:
```sh
pnpm init
```
Este comando creará un archivo `package.json` donde se registrarán las dependencias y configuraciones del proyecto.

---

### 2. Configurar `.gitignore`

Para evitar que ciertos archivos innecesarios o sensibles sean subidos al repositorio de GitHub, creamos un archivo `.gitignore` en la raíz del proyecto y agregamos:
```sh
node_modules/
.env
```
**Explicación:**
- `node_modules/`: Contiene todas las dependencias instaladas. No es necesario subirlo al repositorio, ya que se pueden reinstalar con `pnpm install`.
- `.env`: Se utilizará para almacenar credenciales y configuraciones sensibles que no deben compartirse públicamente.

---

### 3. Instalar Express

[Express](https://expressjs.com/) es un framework minimalista y flexible para Node.js que facilita la creación de aplicaciones web y APIs.
Para instalarlo, ejecuta:
```sh
pnpm install express
```
**¿Por qué Express?**
- Permite definir rutas y manejar peticiones HTTP de forma sencilla.
- Es altamente flexible y minimalista.
- Cuenta con una gran comunidad y muchas herramientas complementarias.

---

### 4. Instalar `cors`

El paquete [`cors`](https://www.npmjs.com/package/cors) permite manejar peticiones desde diferentes dominios en nuestras APIs. Esto es necesario cuando una aplicación frontend intenta comunicarse con nuestro backend alojado en otro origen.
Para instalarlo, usa:
```sh
pnpm install cors
```
**¿Por qué usar CORS?**
- Evita errores de seguridad al permitir peticiones entre distintos dominios.
- Es esencial cuando trabajamos con aplicaciones frontend y backend separadas.

---

### Siguientes pasos
Con estos pasos iniciales completados, en las siguientes secciones configuraremos el servidor de Express y la estructura MVC del proyecto.

---

Si tienes dudas o quieres contribuir, no dudes en hacer un **fork** del repositorio y enviar un **pull request**.

