// argumentos de entrada
console.log(process.argv)

// podemos controlar eventos del proceso
process.on('exit', () => {
  // limpiar recursos
})

// current working directory
console.log(process.cwd())

// controlar el proceso y su salida
process.exit(1)
