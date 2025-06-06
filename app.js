require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const stripe = require("stripe")('sk_test_51MIZEIJn1PSuOXdRnGJP93tzf8Fa87BoC7xQZ0IU8tUyCul1XNAZqquV3DcutsziSaLNu5HjMPf5W50zws3TeqeT00OC6C9FZu');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var categoriesRouter = require('./routes/categories');
var countriesRouter = require('./routes/countries');
var equipmentsRouter = require('./routes/equipments');
var reservationsRouter = require('./routes/reservations');
var paymentsRouter = require('./routes/payments')
var fieldsRouter = require('./routes/fields');
var statesRouter = require('./routes/states')
var permissionsRouter = require('./routes/permissions')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/categories', categoriesRouter);
app.use('/countries', countriesRouter);
app.use('/states', statesRouter)
app.use('/equipments', equipmentsRouter);
app.use('/fields', fieldsRouter);
app.use('/reservations', reservationsRouter);
app.use('/payments', paymentsRouter)
app.use('/permissions', permissionsRouter)


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
