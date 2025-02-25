//Importamos la funcion para crear la aplicación en express y el modelo de MongoDB en este caso
import { createApp } from './app.js'
import { MongoModel } from './models/mongodb/mongodb_model.js'

//Creamos la aplicación con el modelo de MondoDB -> MongoModel
createApp({ dataModel: MongoModel })
