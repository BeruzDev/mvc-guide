//Importamos la funcion para crear la aplicación en express y el modelo de MySQL en este caso
import { createApp } from './app.js'
import { MySQLModel } from './models/mysql/mysql_model.js'

//Creamos la aplicación con el modelo de MySQL -> MySQLModel
createApp({ dataModel: MySQLModel })