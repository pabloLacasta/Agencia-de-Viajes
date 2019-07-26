var express = require('express');
var router = express.Router();
const UserModel = require('../models/user.js');
const TRANSPORTER = require('../config/nodemailer'); //importamos la variable TRASNPORTER de nodemailer.js
const SECRET_JWT = require('../config/password').SECRET_JWT; // Importamos la contraseña que hemos generado.
const BCRYPT = require('bcrypt');
const JWT = require('jsonwebtoken');
const uploadPics = require('../config/multer'); //Importamos la configuración que hemos hecho a multer
const PasswordGenerator=require('../utils/functions/passwordGenerator')
/* GET users listing. */
router.post('/signup', function (req, res, next) {
  console.log(req.body);
  new UserModel({
      ...req.body,
      confirmedEmail: false // este es un campo del objeto user. El booleano
    }).save()
    .then(user => {
      console.log('esto es el usuario', user);
      const TOKEN = JWT.sign({_id: user._id}, SECRET_JWT, {expiresIn: '48h'});
      console.log('esto es el token', TOKEN);
      // UserModel.findByIdAndUpdate(user._id, {imageProfile: Date.now() + '%' + '../public/images/unknown_profile.png'}, {new: true});
      const URL = `http://localhost:3000/activacion/${TOKEN}`
      console.log('esto es la url', URL);

      TRANSPORTER.sendMail({
        from: 'bootcampstream@gmail.com',
        to: user.email,
        subject: "Activación cuenta",
        html: `
        <h1>Bienvenido a nuestra web de viajes<h1>
  
        <p>Por favor, active su cuenta clickando en el siguiente link:
        <a href="${URL}" onclick="${user.confirmedEmail}= true">Haga click aquí para autentificar sus datos</a>
        </p>
      `
      });
      
      res.status(201).send("usuario registrado, por favor confirme sus datos en el correo que le acabamos de enviar")
    })
    .catch(console.log);
});

router.get('/activacion/:jwt', (req, res) => {
  try {
    const PLAYLOAD = JWT.verify(req.params.JWT, SECRET_JWT)
    console.log('esto es el playload', PLAYLOAD);
    UserModel.findByIdAndUpdate(PLAYLOAD._id, {
        confirmedEmail: true
      }, {
        new: true
      })
      .then(user => res.send(user))
  } catch (error) {
    res.status(400).send(error)
  }
});

router.post('/login', (req, res) => {
  const dataLogin = req.body;
  console.log(dataLogin)

  UserModel.findOne({
      $or: [{username: dataLogin.usernameEmail}, {email: dataLogin.usernameEmail}]}) //comprobamos si el username o el email estan en la base de datos. Ponemos findOne para que no nos devuelva la array de objetos.
    .then(user => {
      if (!user) return res.status(400).send('usuario/email o contraseña incorrectos'); // BUSCA FALSY  (para lo de !user). Si el  usuario no se encuentra en la base de datos
      if (user.confirmedEmail === false) return res.status(400).send('You have to verify your email'); //si el usuario existe pero no ha confirmado su email
      else BCRYPT.compare(dataLogin.password, user.password) // primer argumento es el texto plano introducido por el usuario, el segundo es el encriptado
        .then(isMatch => {
          if (!isMatch) return res.status(400).send('usuario/email o contraseña inCorrectos'); // si no hay match
          const TOKEN = user.generateAuthToken(); //llama al método que nos hemos creado en el modelo para generar el token y no llenar cada endpoint de lógica. Este toquen va anclado al usuario desde que se logea, durante un tiemp determinado, para no tener que estar logueaándonos todo el rato
          user['token'] = TOKEN; //creamos una propiedad de user  que va a contener el TOKEN que hemos creado
          // res.send(); // si hay match, es decir, user/email y contraseña son correctos responde con el usuario. Aquí actúa el toJSON que hemos tocado para que no devuelva la contraseña. Podemos escribir send o json (investiga sobre esto), suele ser una cuestión de naming, para que el que lea el código sepa que se va a devolver un json.
          console.log(user)
        })
    })
});

router.get('activate/:token', (req, res) => {
  try {
    const PAYLOAD = JWT.verify(req.params.JWT, SECRET_JWT)
    UserModel.findByIdAndUpdate
  } catch {

  }
  JWT.verify(req.params.JWT, SECRET_WEBTOKEN)
  UserModel.findByIdAndUpdate(PAYLOAD._id, {
      confirmedEmail: true
    })
    .then(user => res.redirect('/register'))
});

router.post('/recovery', async (req, res) => {
  const dataRecovery = req.body;
  try {
    const user = await UserModel.findOne({
      email: dataRecovery.emailRecovery
    })
    if (!user) return res.status(400).send('Email no válido. Por favor, inténtelo de nuevo') //<a href="http//:localhost:3000/recovery">Recover</a>);
    const newPassword = PasswordGenerator(8); //genera nueva contraseña de ocho carácteres
    console.log(newPassword);
    const salt = await BCRYPT.genSalt(9)
    const hash = await BCRYPT.hash(newPassword, salt) // generamos el salt y generamos el hash con el password en texto plano y  el salt
    //encripta la contraseña
    const userUpdated = await UserModel.findByIdAndUpdate(user._id, {password: hash}, {new: true}) //UserModel es el modelo de usuario de mongoose
    await TRANSPORTER.sendMail({
      from: 'bootcampstream@gmail.com',
      to: user.email,
      subject: "Recuperación de la contraseña",
      html: `
                 <p>Su nueva contraseña es  ${newPassword} . 
                 Por favor haga click en el enlace para acceder a su cuenta</p>
                <a href="http://localhost:3000/login/">Acceso a la cuenta</a>`
    })
    res.send('email enviado')
    console.log('ok')

  } catch (error) {console.log(error), res.send(error)}

})

router.post('/settings', uploadPics.single('avatar'), (req, res) => { //uploadPics.single('avatar')-> que solo pueda subir una foto y que se llame 'avatar'=input name
  // UserModel.findByIdAndUpdate(req.user._id, {imageProfile: req.file})
  console.log(req.file);
})


module.exports = router;