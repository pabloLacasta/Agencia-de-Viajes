var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> res.render('index', { title: 'Agencia de Viajes'}));

//GET register page//
router.get('/signup', (req, res, next) => res.render('signup', { title: 'Registro'}));

// router.get('/activacion', (req, res, next) =>  res.render('activacion', {title: 'Cuenta activada'}));

//GET login page//
router.get('/login', (req, res, next)  => res.render('login', {title: 'Login'}));

router.get('/recovery', (req, res, next)=> res.render('recovery', {title: 'Recovery'}));

router.get('/settings', (req, res, next) =>  res.render('settings', {title: 'Settings'}));

router.get('/profile', (req, res, next) =>  res.render('profile', {title: 'Profile'}));

module.exports = router;