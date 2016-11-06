const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoInstance = require('./mongoPool');
const mongoDB = new mongoInstance();
const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use((req, res, next) => {
    mongoDB.getPoolInstance()
      .then(db => {
          app.locals.db = db;
          next();
      }).catch(err => {
        res.status(503);
        res.statusMessage = 'Mongo  not available';
        res.send(err);
      });
});

app.use('/', require('./urlApi'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use((err, req, res, next) => {
  let st = err.status || 500;
  res.statusMessage = err.message;
  res.status(st).send(err);
});

app.listen(port, () => { 
    console.log(`Node.js app is listening at http://localhost:${port}`); 
});

module.exports = app;