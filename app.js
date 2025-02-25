// Importamos las librerías necesarias
import express from 'express'
import {json} from 'express'// -> para que entienda los datos que vienen en formato json

// Importamos las funciones
import { corsMiddleware } from './middleware/auth_middleware.js' // <-importamos el middleware de cors
import { createRoute } from './routes/routes.js' // <-importamos la función 'createRoute' que se encuentra en 'routes.js'

// Creamos la aplicación express 'createApp' que sera llamada des del punto de entrada según el tipo datos con los que trabajemos
export const createApp = ({ dataModel}) => {
	const app= express() //<- creamos la aplicación express
	app.use(corsMiddleware()) //<- usamos el middleware para permitir peticiones de cualquier origen 'auth_middleware.js'
	app.use(json()) //<- usamos el middleware para que entienda los datos en formato .json
	app.disable('x-powered-by') //<- deshabilitamos la cabecera 'x-powered-by' para evitar que se muestre en las respuestas

	// Llamamos a la función 'createRoute' que se encuentra en 'routes.js' y le pasamos el modelo de datos
	app.use('/api', createRoute({ dataModel })) // <-/api es el primer endpoint y dentro de createRoutes están los endpoints específicos

	// Asignamos el puerto a la aplicación
	const port = process.env.PORT || 1234	// <- Si no hay puerto definido en las variables de entorno, usamos el puerto 1234

	// Iniciamos la aplicación en el puerto definido y mostramos un mensaje en la consola
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`)
	})
}
