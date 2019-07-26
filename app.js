require('./config/mongoose');
require('./config/sequelize');


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var destinationsRouter = require('./routes/destinations')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//cada app.use es un middleware
app.use(logger('dev'));
app.use(express.json());//Parseamos la petición de string a json. Si no pones la ruta '/', da por supuesto que lo quieres en todos lados.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//middleware para parsear las cookies
app.use(express.static(path.join(__dirname, 'public')));//Accedemos a la función static. Servimos a la carpeta public todos los contenidos que sean públicos. Static son los recursos estáticos de html ( investigar sobre esto)

app.use('/', indexRouter);//Primero pasa por '/', si no encuentra nada pasa  a la siguiente línea
app.use('/users', usersRouter);//Después pasa por '/users', si no encuentra nada pasa a la siguiente línea. Si no hay nada 404 ( que es la última línea)
app.use('/destinations', destinationsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
