import { readFile } from 'node:fs/promises'

// En este ejemplo utilizamos Promise.all para leer ambos archivos al mismo tiempo

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
])
  .then(([text1, text2]) => {
    console.log(text1)
    console.log(text2)
  })
