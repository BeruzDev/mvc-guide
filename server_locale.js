//Importamos la funcion para crear la aplicación en express y el modelo local en este caso
import { createApp } from './app.js'
import { LocalModel } from './models/localeFile/local_model.js'

//Creamos la aplicación con el modelo local -> LocalModel
createApp({ dataModel: LocalModel })
