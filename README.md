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

---

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

---

### 8. Configurar middleware en la aplicación

Los **middlewares** en Express son funciones que se ejecutan antes de llegar a las rutas o controladores. Nos permiten realizar tareas como:
- Autenticación y autorización.
- Manejo de CORS (Cross-Origin Resource Sharing).
- Registro de peticiones (logging).
- Manejo de errores.
- Parsing de datos (JSON, formularios, etc.).

El middleware de CORS nos ayuda a controlar qué dominios pueden hacer peticiones a nuestro servidor. Lo definiremos en el archivo `middleware/auth_middleware.js` y lo importaremos en el archivo `app.js`.

---

### 9. Definir las rutas (endpoints)

Las rutas son la forma en que nuestra aplicación maneja las solicitudes HTTP. En este paso, las definiremos en el archivo `routes/routes.js` para definir los endpoints principales.

---

### 10. Crear el controlador

Los **controladores** son los encargados de manejar la lógica de nuestra aplicación.  
Se comunican con los **modelos** para obtener o modificar datos y envían una respuesta al usuario.  

En el archivo `controllers/controller.js`, definiremos las funciones que manejarán las solicitudes HTTP para nuestros datos. 

Crearemos una clase para manejar el controlador, las principales ventajas son:

1. **Encapsulación**: Una clase permite encapsular toda la lógica relacionada con un recurso específico en un solo lugar. Esto hace que el código sea más modular y fácil de mantener.

2. **Reutilización**: Al usar una clase, puedes crear múltiples instancias del controlador con diferentes modelos de datos. Esto es útil si tienes diferentes tipos de datos que necesitan ser manejados de manera similar, como haremos en nuestro caso.

3. **Organización**: Las clases ayudan a organizar el código de manera más estructurada. Puedes definir métodos específicos para manejar diferentes tipos de solicitudes HTTP (GET, POST, PUT, DELETE) dentro de la clase.

4. **Estado**: Una clase puede mantener el estado interno, lo que es útil si necesitas almacenar información que debe persistir entre diferentes métodos del controlador.

---

### 11. Crear esquemas de datos

Cuando recibimos datos desde el frontend a través de las peticiones, es importante validarlos antes de enviarlos a la base de datos. Para hacer esto, podemos crear **esquemas de validación** que aseguren que los datos que llegan cumplen con el formato y las reglas que nuestro servidor espera.

Los **esquemas de datos** nos ayudan a verificar que la información recibida sea correcta, lo que previene errores al interactuar con los modelos y la base de datos.

En este paso, utilizaremos la librería **Zod**, una herramienta sencilla y potente para crear esquemas de validación en JavaScript.

- **Instalar la librería Zod:** 
   ```sh
   pnpm install zod
  ```

---

### 12. Crear los modelos

Los **modelos** son la parte del proyecto que se encarga de comunicarse directamente con la base de datos. Gracias a los modelos, el controlador puede acceder a los datos y gestionarlos de manera adecuada. En este paso, vamos a crear tres tipos de modelos para interactuar con diferentes tipos de bases de datos.

Vamos a usar tres tipos de bases de datos distintas:

1. **Base de datos local**: En este caso, vamos a utilizar un archivo `movies.json` para almacenar los datos de forma local. La configuración de este modelo se realizará en el archivo `models/localFile/local_model.js`.

2. **Base de datos MongoDB**: MongoDB es una base de datos NoSQL que guarda la información en un formato más flexible. En este caso, configuraremos el modelo en el archivo `models/mongodb/mongodb_model.js`.

3. **Base de datos MySQL**: MySQL es una base de datos relacional que guarda la información en tablas estructuradas. El modelo para MySQL se configurará en el archivo `models/mysql/mysql_model.js`.

Cada tipo de base de datos tiene sus características y formas de gestionar la información:

- **Local**: Usamos este modelo cuando los datos se guardan en un archivo de texto, como el archivo `movies.json`. Es útil para trabajar con datos pequeños y simples, sin necesidad de configurar una base de datos externa.

- **MongoDB**: Utilizamos este modelo cuando trabajamos con bases de datos NoSQL, como MongoDB. MongoDB es ideal cuando tenemos una estructura de datos más flexible, como documentos JSON, donde no necesitamos una estructura rígida de tablas.

- **MySQL**: Este modelo es para bases de datos SQL como MySQL, donde los datos se organizan en tablas con relaciones entre ellas. Es más adecuado para proyectos que requieren integridad de datos, transacciones y relaciones entre entidades.

Este paso es importante porque te permite tener control sobre cómo accedes a los datos en función del tipo de base de datos que utilices. Cada tipo de base de datos tiene su propia manera de organizar y almacenar la información, y al definir estos tres modelos, tu aplicación podrá trabajar con cualquiera de ellos de forma flexible.

---

### 13. Modelo Local

Para el modelo local generaremos una pequeña funcion en `models/localeFile/readJSON.js` para poder leer archivos JSON de un archivo. Ademas utilizaremos la libreria crypto de node para generar id aleatorias ya que no esta incorporado como en las bases de datos.

### 14. Modelo MongoDB
