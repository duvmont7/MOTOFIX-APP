const cors = require('cors');
const express = require('express');

const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repair.routes');
const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});

app.use('/api/v1/repairs', userRouter);
app.use('/api/v1/users', repairRouter);


module.exports = app;
