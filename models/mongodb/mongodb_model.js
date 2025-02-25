//Importamos dependencias de MongoDB y dotenv
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'//-> dotenv es una librería que nos permite cargar variables de entorno desde un archivo .env

//Cargamos las variables de entorno del archivo .env
dotenv.config()

//En uri usaremos la variable de entorno MONGODB_URI, si no existe usaremos una uri local con el puerto 1234
const uri = process.env.MONGODB_URI ?? 'http://localhost:1234'

//Creamos un cliente y pasamos la constante uri como parámetro, además configuramos el cliente con la versión de la API de MongoDB que nos da en la pagina web de Atlas
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

//Creamos la funcion de conexión a la base de datos de forma asyncrona
async function connect() {
  try {
    await client.connect()//<- Conectamos el cliente
    const database = client.db('movies_db')//<- Seleccionamos la base de datos que hemos creado en MongoDB Atlas
    console.log('Connected to MongoDB') //<- Mostramos un mensaje en consola si la conexión fue exitosa
    return database.collection('movies') //<- Dentro de la bbdd seleccionamos la colección, en mi caso se llama movies
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()//<- Si hay un error cerramos la conexión
  }
}

//Creamos la clase MongoModel y por cada endpoint del archivo 'routes.js' creamos un método estático que se encargará de manejar la lógica de negocio
export class MongoModel {
  static async getAll({ genre }) {//<- Método para obtener todas las películas
    const db = await connect()//<- Conectamos a la base de datos

    if (genre) {//<- Si se recibe un género como parámetro
      return db//<- Devolvemos las películas filtradas por género
        .find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: 'i',
            },
          },
        })
        .toArray()//<- Convertimos el resultado en un array
    }

    return db.find({}).toArray()//<- Si no se recibe un género como parámetro devolvemos todas las películas
  }

  static async getById({ id }) {//<- Método para obtener una película por id
    const db = await connect()//<- Conectamos a la base de datos
    const objectId = new ObjectId(id)//<- Convertimos el id en un ObjectId ya que en MongoDB los id son de tipo ObjectId
    return db.findOne({ _id: objectId })//<- Buscamos la película por id
  }

  static async create({ input }) {//<- Método para crear una película
    const db = await connect()
    const { insertedId } = await db.insertOne(input)//<- Insertamos la película en la base de datos
    return {//<- Devolvemos la película creada
      id: insertedId,//<- La pelicula creada tendrá un id 
      ...input,//<- y con ...input agregamos la nueva pelicula a las peliculas existentes
    }
  }

  static async delete({ id }) {//<- Método para eliminar una película
    const db = await connect()
    const objectId = new ObjectId(id)//<- Convertimos el id en un ObjectId
    const { deletedCount } = await db.deleteOne({ _id: objectId })//<- Eliminamos la película de la base de datos
    return deletedCount > 0//<- Si la película fue eliminada devolvemos true
  }

  static async update({ id, input }) {//<- Método para actualizar una película
    const db = await connect()
    const objectId = new ObjectId(id)//<- Convertimos el id en un ObjectId

    const { ok, value } = await db.findOneAndUpdate(//<- Buscamos la película por id y la actualizamos
      { _id: objectId },//<- Buscamos la película por id
      { $set: input },//<- Actualizamos la película
      { returnNewDocument: true }//<- Devolvemos la película actualizada
    )

    if (!ok) return false//<- Si no se actualiza la película devolvemos false

    return value//<- Devolvemos la película actualizada
  }
}
