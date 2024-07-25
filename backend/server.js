const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./route/auth-route'); 
const app = express();
const cors = require('cors');
const port = 3000;

require('dotenv').config();
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from frontend running on localhost:5431
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
const db = process.env.DBLOGIN;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', authRouter);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
