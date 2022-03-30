//express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// dotenv
require('dotenv').config();

// mongoose
const mongoose = require('mongoose');

// cors
const cors = require('cors');

const routesHandler = require('./routes/handler.js');

const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use('/', routesHandler);
app.use(cors);

const mongoDB = process.env.MONGO_URI;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.log(error);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
