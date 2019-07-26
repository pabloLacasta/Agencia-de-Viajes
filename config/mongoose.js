//ESTABLECEMOS CONEXIÓN CON LA BASE DE DATOS DE MONGODB

const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/WebTravelAgency_dev`,{
    useCreateIndex: true, useNewUrlParser: true })
.then(() => console.log(`Connected to database mongodb://localhost:27017/WebTravelAgency_dev`))
.catch((error) => console.log('Connection to MongoDB failed!:( \n' + error))

module.exports = mongoose;