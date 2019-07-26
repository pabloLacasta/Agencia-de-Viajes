// MODELO DEL USUARIO

const mongoose = require('mongoose');
const  {isEmail} = require('validator'); //librería de npm que comprueba que lo que pongamos en el formulario sea un email. Necesario instalar en  la terminal
const bcrypt = require('bcrypt'); //Encripta las contraseñas. También se ha de instalar.
const JWT = require('jsonwebtoken');
const SECRET_AUTH_JWT = require('../config/password').SECRET_AUTH_JWT
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength : 40
    },
    lastname:{
        type: String,
    
        maxlength: 40
    },
    email:{
        type: String,
        trim: true, //elimina los espacios en blanco si es true. Útil para los emails. Es un método también en javascript
        // unique: true,
        required: true,
        validate: function (email){//para hacerlo de forma asíncrona, si no no puedes seguir rellenando el formulario mientras se comprueba que el email sea válido. Validate es de monggose, ya sabe de entrada que si el email no es válido tiene que guardarlo
            return new Promise(function(resolve){
                setTimeout(function(){
                    resolve(isEmail(email));
                }, 5)
            })
        }
    },
    username:{
        type: String,
        unique: true,
        require: true 
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    // imageProfile: {
    //     type: String,
    //     // required:true,
    //     unique: true
    // },
    confirmedEmail:{
         type: Boolean
    },
},{strict:false});//Podemos añadir los campos que queramos para que se guarden en la base de datos sin haberlos definido previamente. Con strict true, la que viene por defecto, no es tan laxo.

userSchema.methods.toJSON = function(){//override(buscar en programación orientada a objetos). Sobreescribimos el método toJSON que automáticamente devolvería todas las propiedades de user, para que no nos devuelva la password, qe no nos interesa. FILTRAMOS
    //el toJSON lo llamamos en users.js cuando el usuario se loguea.
    const { _id, name, lastname, email, TOKEN } = this//this es el user de cuando se ejecuta el métdo toJSON  y coge las propiedades que queremos enviar al frontend 
    return {_id, name, lastname, email, TOKEN}//qué queremos que develva el toJSON

}
userSchema.pre('save',  function (next) { // .pre es middleware de mongoose  ( middleware es algo  que se ejecuta entre req y res), se ejecuta en cada 'save'. Se llama así porque se ejecuta antes de hacer el save
    const user = this; //utilizamos function de ES5 para acceder al this, que es lo que hay en el new userModel de users.js, en este caso el req.body, que es lo que hemos escrito en el formulario
    if (user.isModified('password')) { //condicionamos a que el password haya sido cambiado
      bcrypt.genSalt(9)
  .then(salt => bcrypt.hash(user.password, salt) // generamos el salt y generamos el hash con el password en texto plano y  el salt
  .then(hash => { //enchoriza la contraseña
        user.password = hash;  // asignamos el hash como campo password antes de guardar en la base de datos
        return next(); //damos paso a la función save() del model de mongoose, es decir, guardamos la contraseña encriptada
      }).catch(err => next(err))).catch(err => next(err)) //capturamos errores de haberlos
    } else next(); //sino ha sido modificado el password pasa al save directamente
  });

  
  
  userSchema.methods.generateAuthToken = function (){
      const user = this;// aqui el this es el user porque es donde estamos llamando al método.
      const TOKEN = JWT.sign({_id: user._id}, SECRET_AUTH_JWT, {expiresIn: '7d'})
      return TOKEN;
      
    }
    
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;