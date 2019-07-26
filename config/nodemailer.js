//copiado de la documentación de nodemailer

const nodemailer = require( 'nodemailer' )
const config = require( './password' )
let transporter = nodemailer.createTransport( {// creamos el mail que va a enviar el correo de autenticación
    service: 'Gmail',
    secure: true,
    auth: {
        user: config.GMAIL.email,
        pass: config.GMAIL.password
    },
    tls:{
        rejectUnauthorized: false//soluciono el error que me salía antes: UnhandledPromiseRejectionWarning: Error: self signed certificate in certificate chain
    }
})
module.exports = transporter;