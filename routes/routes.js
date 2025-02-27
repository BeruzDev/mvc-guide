//Importamos la librería router de express
import { Router } from 'express'
//Importamos el controlador de la ruta
import { Controller } from '../controllers/controller.js' //<- el conrolador es el que escoje que ruta utilizar según el tipo de petición

//Creamos la función 'createRoute' que recibe un objeto con el modelo de datos
export const createRoute = ({ dataModel }) => {
	const router = Router() //<- creamos el router de express

	const controller = new Controller({ dataModel }) //<- creamos el controlador de la ruta	con el tipo de dato por parametro 'dataModel'

//Definimos los endpoints de la aplicación junto con los metodos, en este caso la base de datos es de peliculas asi usaremos movie para tener un endpoint mas descriptivo 
	router.get('/', controller.getAll)//<-si la peticion es get y no lleva id, se ejecuta el metodo getAll del control
	router.get('/:id', controller.getById)//<-si la peticion es get y lleva id, se ejecuta el metodo getById del control
	router.post('/', controller.create)//<-si la peticion es post, se ejecuta el metodo create del control
	router.delete('/:id', controller.delete)//<-si la peticion es delete, se ejecuta el metodo delete del control
	router.patch('/:id', controller.update)//<-si la peticion es patch, se ejecuta el metodo update del control

	return router
}