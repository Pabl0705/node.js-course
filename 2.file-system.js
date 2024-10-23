const fs = require('node:fs') // Poner siempre el prefijo 'node:' para usar módulos nativos de Node.js (recomendado oficialmente)

// Filsystem stats

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)

// Filesystem read SINCRONO

console.log('Leyendo archivo de forma SINCRONA --------------------------------------')

console.log('Leyendo el primer archivo...')
const data = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(data)

console.log('Leyendo el segundo archivo...')
const data2 = fs.readFileSync('./archivo2.txt', 'utf-8') // No nos interesa la sincronia, vamos a utilizar un callback...

console.log(data2)

// Filsystem read ASINCRONO

console.log('Leyendo archivo de forma ASINCRONA --------------------------------------')

console.log('Leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8', (err, data) => { // Ahora tenemos que saber cuando termina la lectura (callback tercer parametro)
  console.log(data)
  console.error(err)
})

console.log('Hacemos cosas...') // Esto se ejecuta igualmente aunque este leyendo el primer archivo, ya volvera cuando termine la lectura

fs.readFile('./archivo2.txt', 'utf-8', (err, data) => { // Podemos poner el mismo nombre en las variables del callback (son funciones al fin y al cabo)
  console.log(data)
  console.error(err)
})
