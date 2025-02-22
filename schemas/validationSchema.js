//Importar la libreria zod 
import z from 'zod'

//Tomando como referencia el archivo /models/localeFile/movies.json crearemos un esquema de validación para los datos que se reciban en la petición, este mismo json lo pasaremos a mongoDB y a MySQL.

//Definir el esquema de validación
const dataSchema = z.object({
	title: z.string({
		invalid_type_error: 'Title must be a string',
		required_error: 'Title is required'
	}),
	year: z.number().int().min(1900).max(2025),
	director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

//Pasamos el body de la peticion por el dataSchema
export function validateData(input) {
	return dataSchema.safeParse(input)
}

//Pasamos parcialmente el body de la peticion por el dataSchema por si no se envian todos los campos
export function validatePartialData(input){
	return dataSchema.partial().safeParse(input)
}