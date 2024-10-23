const fs = require('node:fs/promises')
// TRANSFORMAR FUNCIONES DE CALLBACK A PROMESAS
// const { promisify } = require('node:util')   --> Es mejor usar el método de promises, pero tambien podemos usar el método promisify

console.log('Leyendo archivo de forma ASINCRONA --------------------------------------')

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8') // Ahora es una promesa que devuelve el contenido del archivo cuando termina la lectura
  .then(data => console.log(data))

console.log('Hacemos cosas...') // Esto se ejecuta igualmente aunque este leyendo el primer archivo, ya volvera cuando termine la lectura

console.log('Leyendo el segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8')
  .then(data => console.log(data))
