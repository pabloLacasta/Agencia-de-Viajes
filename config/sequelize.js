//ESTABLECEMOS CONEXIÓN CON LA BASE DE DATOS MYSQL
//Instalamos sequelize desde node
//Instalamos  mysql2

const Sequelize = require ('sequelize');


const connection = new Sequelize('webtravelagency', 'root','', {
    host:'localhost', //dónde está la base de datos
    dialect:'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

connection
.authenticate()
.then(() => {console.log('MySQL Connection has been established successfully.')})
.catch(err => {console.error('Unable to connect to the database:', err)});

module.exports = connection;
