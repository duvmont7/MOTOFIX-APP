const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');

//manejo de errores
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//routes
const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repairs.routes');
const app = express();

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour',
});

// middlewares
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

// errores
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
