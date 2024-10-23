const path = require('node:path')

// unir rutas con path.join

console.log('Barra separadora según SO:')
console.log(path.sep) // "\" o "/" según el sistema operativo

console.log('------------------------------------------------------------')
const filePath = path.join('content', 'subfolder', 'archivo.txt')
console.log(filePath)

console.log('Get file with extension ------------------------------------------------------------')
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

console.log('Get file without extension ------------------------------------------------------------')
const fileName = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(fileName)

// Uno de los mas utiles es:

console.log('Get only the extension ------------------------------------------------------------')
const extension = path.extname('image.jpg')
console.log(extension)
