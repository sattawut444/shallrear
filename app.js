var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ==================================================================================================

var indexRouter = require('./routes/index');
var covidRouter = require('./routes/covid');
var perimeterRouter = require('./routes/perimeter');
var aboutRouter = require('./routes/about');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var loginRouter = require('./routes/lo');
// Dynamic Route
app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/perimeter', perimeterRouter);
app.use('/covid', covidRouter);
app.use('/about', aboutRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/lo', loginRouter);

// ==================================================================================================

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
