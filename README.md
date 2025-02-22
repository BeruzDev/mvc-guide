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

Para una mejor optimización de paquetes, usaremos `pnpm` en lugar de `npm` o `yarn`. Si no lo tienes instalado, ejecúta:
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

### 5. Crear la estructura de carpetas MVC

La arquitectura MVC se divide en tres partes principales:
- **Modelos (`models/`)**: Contienen la lógica de negocio y la gestión de datos.
- **Vistas (`views/`)**: Encargadas de la interfaz de usuario.
- **Controladores (`controllers/`)**: Gestionan la lógica de la aplicación, reciben peticiones y responden usando los modelos.
- **Middleware (`middleware/`)**: Contiene funciones de middleware personalizadas que se ejecutan durante el ciclo de solicitud/respuesta.
- **Rutas (`routes/`)**: Definen los endpoints de la aplicación y especifican qué controladores deben manejar las solicitudes para cada ruta.

Para crear la estructura de carpetas en la terminal, ejecuta:
```sh
mkdir models views controllers middleware routes
```
Esto generará las carpetas necesarias para organizar el código de manera modular y estructurada.

---

### 6. Crear el archivo de entrada `app.js` y configurar el servidor

Para poder arrancar el servidor, es necesario tener un archivo principal que centralice toda la configuración de la aplicación. Por ello, creamos el archivo `app.js` en la raíz del proyecto, donde configuraremos el servidor Express y definiremos la estructura base de la aplicación.

Una alternativa es crear tres archivos de servidor, uno para cada tipo de base de datos con los que vamos a trabajar: local, MySQL y MongoDB.

En la raíz del proyecto, crea tres archivos llamados `server_locale.js`, `server_mysql.js` y `server_mongodb.js`. Estos archivos serán responsables de inicializar la conexión con el tipo de base de datos correspondiente y de cargar el archivo `app.js`.

Para poder iniciar la aplicación desde la terminal con comandos personalizados, podemos agregar scripts en el archivo `package.json` para cada tipo de servidor:

```json
"scripts": {
  "start-locale": "node --watch server_locale.js",
  "start-mysql": "node --watch server_mysql.js",
  "start-mongodb": "node --watch server_mongodb.js"
}
```

De esta manera, podrás arrancar el servidor simplemente escribiendo en la terminal:

```sh
  pnpm run start-locale  # Para usar la base de datos local
  pnpm run start-mysql   # Para usar MySQL
  pnpm run start-mongodb # Para usar MongoDB

```

### 7. Crear archivos en cada carpeta

Para mantener la estructura del proyecto organizada, crearemos archivos en cada una de las carpetas que hemos generado:

- **models**: Aquí definiremos nuestros modelos de datos. A partir del archivo `movies.json` generaremos las distintas bases de datos en los distintos formatos. Dentro de `models`, crearemos tres sub-carpetas para diferentes modelos de acceso a diferentes bases de datos:

  - **local**: Para acceder a la información de forma local.
    ```sh
    mkdir -p models/local
    touch models/local/local_model.js
    ```
  - **mysql**: Para base de datos MySQL.
    ```sh
    mkdir -p models/mysql
    touch models/mysql/mysql_model.js
    ```
  - **mongodb**: Para una base de datos MongoDB.
    ```sh
    mkdir -p models/mongodb
    touch models/mongodb/mongodb_model.js
    ```

- **views**: Aquí colocaremos nuestras vistas. La parte con la que el usuario interactúa, la interfaz.
  ```sh
  touch views/index.ejs
	```

- **controllers**: Aquí definiremos nuestros controladores. Por ejemplo, podemos crear un archivo `controller.js` para manejar la lógica relacionada con los usuarios.
  ```sh
  touch controllers/controller.js
	```

- **middleware:** Aquí colocaremos nuestras funciones de middleware personalizadas. Por ejemplo, podemos crear un archivo `auth_middleware.js` para manejar la autenticación.
  ```sh
  touch middleware/auth_middleware.js
	```

- **routes:** Aquí definiremos nuestras rutas. Por ejemplo, podemos crear un archivo `routes.js` para las rutas relacionadas con los usuarios.
  ```sh
  touch routes/routes.js
	```

Cada uno de estos archivos tendrá una funcionalidad específica que iremos desarrollando a medida que avanzamos en el proyecto.

### 8. Configurar middleware en la aplicación

Los **middlewares** en Express son funciones que se ejecutan antes de llegar a las rutas o controladores. Nos permiten realizar tareas como:
- Autenticación y autorización.
- Manejo de CORS (Cross-Origin Resource Sharing).
- Registro de peticiones (logging).
- Manejo de errores.
- Parsing de datos (JSON, formularios, etc.).

El middleware de CORS nos ayuda a controlar qué dominios pueden hacer peticiones a nuestro servidor. Lo definiremos en el archivo `middleware/auth_middleware.js` y lo importaremos en el archivo `app.js`.

### 9. Definir las rutas (endpoints)

Las rutas son la forma en que nuestra aplicación maneja las solicitudes HTTP. En este paso, las definiremos en el archivo `routes/routes.js` para definir los endpoints principales.

### 10. Crear el controlador

Los **controladores** son los encargados de manejar la lógica de nuestra aplicación.  
Se comunican con los **modelos** para obtener o modificar datos y envían una respuesta al usuario.  

En el archivo `controllers/controller.js`, definiremos las funciones que manejarán las solicitudes HTTP para nuestros datos.  

### 11. Crear esquemas de datos

Los **esquemas de datos** se utilizan para validar la información que recibimos en las peticiones antes de interactuar con los modelos. Esto nos ayuda a asegurarnos de que los datos sean correctos y tengan el formato adecuado.

En este paso, vamos a utilizar la librería **Zod**, que es una herramienta sencilla y poderosa para crear esquemas de validación en JavaScript.

- **Instalar la librería Zod:** 
   ```sh
   pnpm install zod
  ```
