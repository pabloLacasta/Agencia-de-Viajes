//DEFINIMOS MODELO DE LOS DESTINOS PARA MYSQL


const connection = require('../config/sequelize');
const Sequelize = require('sequelize');

const Destination = connection.define('destination', {
    destination: Sequelize.STRING},
    {imagePath: Sequelize.STRING},
    // price: Sequelize.NUMBER,
    // discount: Sequelize.NUMBER
)

Destination.sync ({
    logging:console.log,
    
    
})
.then(() => {console.log('Destination model syncornized with destination table')})
.catch(console.log)

module.exports = Destination;