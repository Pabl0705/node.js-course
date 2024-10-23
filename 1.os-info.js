const os = require('node:os')

console.log('Información del sistema operativo')
console.log('--------------------------------------')

console.log('Nombre del sistema operativo:', os.platform())
console.log('Versión del sistema operativo:', os.release())
console.log('Arquitectura:', os.arch())
console.log('CPUs:', os.cpus()) //  <-- Mejora la escalabilidad
console.log('Memoria libre:', os.freemem() / 1024 / 1024)
console.log('Memoria total:', os.totalmem() / 1024 / 1024)
console.log('Tiempo encendido:', os.uptime() / 60 / 60)
