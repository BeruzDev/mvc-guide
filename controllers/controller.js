//Importamos la función de validación de datos
import { validateData, validatePartialData } from '../schemas/validationSchema.js' //<- importamos la función de validación de datos

//Creamos una clase 'Controller' que se instanciara cada vez que se haga una petición a la API
export class Controller {
  //Creamos el constructor de la clase 'Controller' que recibe el modelo de datos por parametro
  constructor({ dataModel }) {
    this.dataModel = dataModel
  }

  //Creamos los metodos que referencian a las rutas del archivo 'routes.js'

  getAll = async (req, res) => {// <- de forma async para que no bloquee el hilo principal, recibimos una peticion(req) y devolvemos una respuesta(res)
    //Podemos filtrar por algún campo en concreto por ejemplo el genero de la pelicula
    const { genre } = req.query
    const data = await this.dataModel.getAll({ genre }) //<- llamamos al modelo de datos y le pasamos el genero por parametro
    res.json(data) //<- devolvemos la respuesta en formato json (en este caso es por que trabajaremos con un archivo de peliculas en formato json)
  }

  getById = async (req, res) => {
    const { id } = req.params //<- extraemos el id de los parametros de la petición
    const data = await this.dataModel.getById({ id }) //<- llamamos al modelo de datos y le pasamos el id por parametro
    if (data) return res.json(data) //<- si hay datos devolvemos la respuesta en formato json
    res.status(404).json({ message: 'Movie not found' }) //<- si no hay datos devolvemos un estado 404
  }

  create = async (req, res) => {
    //Al recibir datos, primero los validamos pasandolos por el schema de validación, '/schemas/validationSchema.js'
    const dataBody = validateData(req.body) // <- Recogemos los datos del cuerpo de la petición y se los pasamos a la funcion de validación
    if (!dataBody.success) //<- Si la comparacion NO es correcta devolvemos un estado 400 con el mensaje de error
      return res.status(400).json({ error: JSON.parse(result.error.message) }) 
    const newData = await this.dataModel.create({ input: dataBody.data }) // <- Si la comparacion es correcta, llamamos al modelo de datos y creamos un nuevo registro con los datos validados
		res.status(201).json(newData) //<- Devolvemos un estado 201 con los datos del nuevo registro
	}

	delete = async (req, res) => {
    const { id } = req.params //<- extraemos el id de los parametros de la petición
    const data = await this.dataModel.delete({ id })//<- llamamos al modelo de datos y le pasamos el id por parametro
    if (data === false) //<- si no hay datos devolvemos un estado 404
      return res.status(404).json({ message: 'Movie not found' })
    return res.json({ message: 'Movie deleted' }) //<- si hay datos devolvemos un mensaje con una respuesta en formato json
  }

	update = async (req, res) => {
    const data = validatePartialData(req.body) // <- Recogemos los datos del cuerpo de la petición y se los pasamos a la funcion de validación, en este caso al ser solamente una actualización parcial, usamos la función de validación parcial
    if (!data.success) //<- Si la comparacion NO es correcta devolvemos un estado 400 con el mensaje de error
      return res.status(400).json({ error: JSON.parse(data.error.message) })
    const { id } = req.params //<- extraemos el id de los parametros de la petición
    const updatedData = await this.dataModel.update({ id, input: data.data })
    return res.json(updatedData) //<- Devolvemos un estado 200 con los datos actualizados
  }
}
