const DestinationModel = require('../models/destination');
const router  = require('express').Router();

router.get('/', (req, res) => {
    DestinationModel.findAll()
    .then(destinations => {res.send(destinations)});//hace petición a la base de datos
    res.end(destinations)
});

router.get('/add/:destination', (req, res) => {//si escribo la url en el navegador se añade un objeto con el destino que le pongamos
    DestinationModel.create({
        destination: req.params.destination
    })
    .then(res.redirect('/destinations'))
})
module.exports = router;