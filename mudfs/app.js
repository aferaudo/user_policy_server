let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let logger = require('morgan');
let fs = require('fs');
let indexRouter = require('./routes/index');
let mudFileRouter = require('./routes/mudfile');
let certificateRouter = require('./routes/certificate');
let adminFileRouter = require('./routes/adminMudFile');
let loginRouter = require('./routes/login');
let regRouter = require('./routes/register');



let app = express();

//Each time that the server is started we need to delete all the file in the directory script (because they could be out of date)
var directory = "script"
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if(file.endsWith('.json') || file.endsWith('.p7s'))
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
//use sessions for tracking logins
app.use(session({
  secret: 'mud_project',
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // This is typically use to serve all the static files int he /public directory


// The imported code will define particular routes for the different parts of the site
app.use('/info', indexRouter);
app.use('/cert.pem', certificateRouter);
app.use('/admin', adminFileRouter);
app.use('/login', loginRouter);
app.use('/registration', regRouter);
app.use('/', mudFileRouter);


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
