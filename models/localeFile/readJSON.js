// Importamos el modulo createRequire de node
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)