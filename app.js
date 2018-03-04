/* jshint esversion: 6 */
/* eslint-disable no-console */
// import { conEstablish } from './mysql-connect';

const path = require('path');
const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const sha256 = require('sha256');
const mysql = require('./mysql-connect.js');

app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true,
}));

const con = mysql.conEstablish();

app.use('/', express.static(__dirname));
app.use('/images', express.static(`${__dirname}/images`));
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/main.html`));
});

app.post('/newuser', (req, res) => {
  console.log(req.body);
  con.query( // encrypt password with sha256, userID generated from name+password
    `INSERT INTO user(username, password, userID) VALUES (
      '${req.body.name}', '${sha256(req.body.pass)}'
    )`,
    (err, results) => {
      if (err) throw err;
      console.log(results);
    },
  );
  res.status(202).send();
});

app.listen(8080, () => {
  console.log('Listening on port 8080;');
});
