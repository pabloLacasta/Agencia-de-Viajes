//Configuramos multer, librería para subir documentos. En este caso lo vamos a usar para subir imágenes. Lo aplicaremos para que los usuarios suban su foto de perfil

const Multer = require('multer'); //aquí llamamos a la librería multer
const mimetypes = [ 'image/png', 'image/jpg', 'image/jpeg' ];//definimos que clase de archivos se van a poder subir
const uploadPics = Multer( { //aquí pasamos la configuración de dicha librería
    storage: Multer.diskStorage( {
        destination: ( req, file, callback ) => {
            callback( null, './public/uploads/profilePictures' );// aquí especificas el directorio donde se guardan las imagenes de perfil
        },
        filename: ( req, file, callback ) => {
            callback( null, Date.now() + '-' + file.originalname ); // aquí especificas el nombre del archivo imagen guardado, usamos el date.now para asignar un valor totalmente aleatorio y único, ya que no nos interesa que haya dos usuarios con fotos de avatar con el mismo nombre
        },
    } ),
    fileFilter: ( req, file, callback ) => {
        if ( mimetypes.includes( file.mimetype ) ) { //aquí compruebo que mimetype del archivo que me estan enviando sea el que yo tenga recogido
            callback( null, true )
        } else {
            callback( null, false )
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 } // limitamos el tamaño del archivo
} );

module.exports = uploadPics;