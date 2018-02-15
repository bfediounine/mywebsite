/*jshint esversion: 6*/
const mysql = require('mysql');

const conEstablish = () => {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		insecureAuth: true
	});
	
	con.connect((err) => {
		if (err) throw err;
		console.log("Connected to MySQL");
	});
	
	/* verifying database/table existance, establishing connection */
	con.query("CREATE DATABASE IF NOT EXISTS webdb", (err, results) => {
		if (err) throw err;
		console.log("MySQL: webdb created/verified: " + results);
	}); //TODO: ENCRYPT PASSWORD!!!!! PRIOR TO INSERT
	con.query("CREATE TABLE IF NOT EXISTS webdb.user(username VARCHAR(255), password VARCHAR(255))", (err, results) => {
		if (err) throw err;
		console.log("MySQL: webdb.user created/verified: " + results);
	});
	con.query("USE webdb", (err, results) => {
		if (err) throw err;
		console.log("MySQL: using webdb: " + results);
	});

	return con; // return handle to established connection
};

module.exports = conEstablish;

