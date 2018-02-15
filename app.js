/*jshint esversion: 6*/
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const conEstablish = require('./mysql-connect.js');

app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));

const con = conEstablish();

app.use('/', express.static(__dirname));
app.use('/images', express.static(__dirname + '/images'));
app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname + '/main.html'));
});

app.post('/newuser', (req, res, next) => {
	console.log(req.body);	
	con.query('INSERT INTO user(username, password) VALUES (\'' + req.body.name + '\', \'' + req.body.pass + '\')', 
				(err, results) => {
		if (err) throw err;
		console.log(results);
	});
	res.status(202).send();
});

app.listen(8080, () => {
	console.log("Listening on port 8080;");
});
