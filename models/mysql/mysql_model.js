// Importamos la librería mysql2/promise
import mysql from 'mysql2/promise'
import dotenv from 'dotenv' //<- Dotenv para importar las variables de entorno de '.env'


dotenv.config() //<- Cargamos las variables de entorno

// Una configuracion por defecto por si falla la carga de las variables de entorno
const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb',
}

// Creamos la conexión a la base de datos
const connectionString = process.env.MYSQL_PUBLIC_URL ?? DEFAULT_CONFIG //<- Usamos la variable de entorno o la configuración por defecto

// Creamos la conexión a la base de datos
const connection = await mysql.createConnection(connectionString)

console.log('✅ Conexión exitosa a MySQL')

//Creamos la clase MySQLModel que manejara las operaciones con la bbdd MySQL
export class MySQLModel {
  static async getAll({ genre }) {//<- Método para obtener todas las películas
    let query =//<-La query es la sentencia SQL que se ejecutará
      'SELECT movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, BIN_TO_UUID(movie.id) id'
    let params = [] //<-Los parametros que se pasaran a la query

    if (genre) {//<- Si se pasa un género se añade a la query
      const lowerCaseGenre = genre.toLowerCase()
      query +=//<- Se añade a la query la tabla de géneros y se filtra por el género pasado
        ', genre.name as genre FROM movie INNER JOIN movie_genres ON movie.id = movie_genres.movie_id INNER JOIN genre ON movie_genres.genre_id = genre.id WHERE LOWER(genre.name) = ?'
      params.push(lowerCaseGenre)//<- Se añade el género a los parametros
    } else {
      query += ' FROM movie'//<- Si no se pasa género se añade a la query solo la tabla de películas
    }

    const [movies, tableInfo] = await connection.query(query, params)//<- Se ejecuta la query

    return movies//<- Se retorna el resultado de la query
  }

  static async getById({ id }) {//<- Método para obtener una película por su id
    const [movies] = await connection.query(
      `SELECT movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, 		BIN_TO_UUID(movie.id) id 
			FROM movie WHERE movie.id = UUID_TO_BIN(?)`,
      [id]//En esta peticion directamente en el array movies se le crea una conexion, se le pasa la query y por parametro la id
    )

    if (movies.length === 0) return null//<- Si no hay películas se retorna null
    return movies[0]//<- Si hay películas se retorna la primera que se ha encontrado con ese id
  }

  static async create({ input }) {//<- Método para crear una película
    const [uuidResult] = await connection.query('SELECT UUID() as uuid')//<- Se genera un UUID(Identificador único universal)
    const [{ uuid }] = uuidResult//<- Se obtiene el UUID de la respuesta

    await connection.query(//<- Se ejecuta la query para insertar la película
      `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?)`,//<- se ponen tantos ? como campos a insertar
      [
        input.title,
        input.year,
        input.director,
        input.duration,
        input.poster,
        input.rate,
      ]//<- parametros que se pasan a la query
    )

    const [movies] = await connection.query(//<- Se ejecuta la query para obtener la película insertada
      'SELECT movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, BIN_TO_UUID(movie.id) id FROM movie WHERE movie.id = UUID_TO_BIN(?)',
      [uuid]
    )

		return movies[0]//<- Se retorna la película insertada
  }

  static async delete({ id }) {//<- Método para borrar una película
    const [movies] = await connection.query(//<- Se ejecuta la query para obtener la película a borrar
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?)',
      [id]
    )
  }

  static async update({ id, input }) {//<- Método para actualizar una película
			let query = 'UPDATE movie SET '//<- Se crea una query para actualizar la película y si tambien se recibe algun parametro dentro del input, como titulo o año etc, se añade a la query
			const params = []
			if(input.title){
				query += 'title = ?, '
				params.push(input.title)
			}
			if(input.year){
				query += 'year = ?, '
				params.push(input.year)
			}
			if(input.director){
				query += 'director = ?, '
				params.push(input.director)
			}
			if(input.duration){
				query += 'duration = ?, '
				params.push(input.duration)
			}
			if(input.poster){
				query += 'poster = ?, '
				params.push(input.poster)
			}
			if(input.rate){
				query += 'rate = ?, '
				params.push(input.rate)
			}
			query = query.slice(0, -2)//<- Se elimina la coma y el espacio del final de la query
			query += ' WHERE id = UUID_TO_BIN(?)'//<- Se añade a la query la condición de que se actualice la película con el id pasado
			params.push(id)//<- Se añade el id a los parametros
		
		await connection.query(query, params)//<- Se ejecuta la query
		
		const [movies] = await connection.query(//<- Se ejecuta la query para obtener la película actualizada
      'SELECT movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, BIN_TO_UUID(movie.id) id FROM movie WHERE movie.id = UUID_TO_BIN(?)',
      [id]
    )

		return movies[0]//<- Se retorna la película actualizada
	}
}
