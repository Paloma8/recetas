var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var sesion = require('client-sessions');

/*var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');*/
var controlador = require('./routes/controlador');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride((req,res)=>{
	if(req.body.metodo){
		var method = req.body.metodo;
		delete req.body.metodo;
		return method;
	}

}));
app.use(sesion({
  cookieName: 'sesion',
  secret:'nvfinvfdnbfnfd',
  duration:30*60*1000,
  activeDuration:5*60*1000,
}));

/*app.use('/', indexRouter);
app.use('/users', usersRouter);*/
app.use('/',controlador);

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
