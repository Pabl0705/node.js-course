// PONEMOS EN PRACTICA TODO
const pc = require('picocolors')
const fs = require('node:fs/promises') // Sistema de modulos
const path = require('node:path')

const dir = process.argv[2] ?? './' // Utilización de argumentos y process

const ls = async (dir) => { // Asincronia secuencial porque hasta que no leamos el directorio no podemos continuar leyendo los demás archivos.
  let files
  try {
    files = await fs.readdir(dir)
  } catch {
    console.error(pc.red('Error al leer directorio:', dir))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(dir, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.error(pc.red('Error al obtener estadísticas de:', filePath)) // Este error no deberia poder ocurrir en este caso, pero lo dejamos para que se vea cómo manejar este tipo de error.
      return null
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file)}\nSize: ${fileSize}\nLast Modification: ${fileModified} `
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(dir)
