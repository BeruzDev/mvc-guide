// Importamos cors desde la librería cors
import cors from 'cors';

//Podemos definir los orígenes permitidos en una constante
const ACCEPTED_ORIGINS = [
  'http://localhost:3000', // <- Nuestro puerto de desarrollo
	'https://myfrontend.com', // <- Nuestro frontend en producción//!cambiar cuando deployee el front
];

// Definimos el middleware de cors
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
	// Usamos la función cors de la librería cors
  cors({
    origin: (origin, callback) => { // <- origin es el origen de la petición y callback es la función que se ejecutará después de comprobar el origen
      if (!origin || acceptedOrigins.includes(origin)) { //<- Si no hay origen o el origen está en la lista de orígenes permitidos
        return callback(null, true); //<- Llamamos a la función callback con null y true -> permitimos la petición
      }
      return callback(new Error('Not allowed by CORS')); // <- Si no, llamamos a la función callback con un error
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], //<- Métodos permitidos
    allowedHeaders: ['Content-Type'], // <- Cabeceras permitidas
  });
