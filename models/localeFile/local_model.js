//Importamos dependencias
import { randomUUID } from 'node:crypto' //Importamos la dependencia crypto para generar un Universal Unique Identifier (UUID)
import { readJSON } from './readJSON.js' //Importamos la función readJSON para leer el archivo JSON

//Almacenamos en una constante el contenido del archivo movies.json
const movies = readJSON('./movies.json')

console.log('✅ Conexión exitosa al servidor local')

//Creamos la clase LocalModel y por cada endpoint del archivo 'routes.js' creamos un método estático que se encargará de manejar la lógica de negocio
export class LocalModel {
  static async getAll({ genre }) {
    if (genre) {
      //Si se recibe un género como parámetro
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      ) // <- Filtramos las películas por género
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id) //Buscamos la película por id
    return movie // <- Retornamos la película encontrada
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), //Generamos un UUID
      ...input, // <- Agregamos los datos de la nueva película
    }

    movies.push(newMovie) // <- Agregamos la nueva película al array de películas
    return newMovie // <- Retornamos la nueva película
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id) //Buscamos la película por id
    if (movieIndex === -1) return false // <- Si no se encuentra la película retornamos false

    movies.splice(movieIndex, 1) // <- Eliminamos la película del array de películas
    return true
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id) //Buscamos la película por id
    if (movieIndex === -1) return false // <- Si no se encuentra la película retornamos false

    movies[movieIndex] = { // <- Actualizamos la película
      ...movies[movieIndex], // <- Copiamos los datos de la película
      ...input, // <- Actualizamos los datos de la película
    }

    return movies[movieIndex] // <- Retornamos la película actualizada
  }
}
