/* jshint esversion: 6 */
/* eslint-disable no-console, no-tabs */

const mysql = require('mysql');

module.exports = {
  conEstablish: () => {
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      insecureAuth: true,
    });

    con.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL');
    });

    /* verifying database/table existance, establishing connection */
    con.query('CREATE DATABASE IF NOT EXISTS webdb', (err) => {
      if (err) throw err;
      console.log('MySQL: webdb created/verified;');
    }); // encrypted with SHA256
    con.query(
      `CREATE TABLE IF NOT EXISTS webdb.Users(
		    username NVARCHAR(255) NOT NULL, 
		    password NVARCHAR(255) NOT NULL,
		    PRIMARY KEY (username)
	    )`,
      (err) => {
        if (err) throw err;
        console.log('MySQL: webdb.Users created/verified;');
      },
    );
    con.query( // trackID = COUNT(*) + 1
      `CREATE TABLE IF NOT EXISTS webdb.Tracks(
        trackID int,
        trackName VARCHAR(255),
        trackURL VARCHAR(100),
        username NVARCHAR(255),
        PRIMARY KEY (trackID),
        CONSTRAINT FK_username FOREIGN KEY (username) REFERENCES Users(username)
	    )`,
      (err) => {
        if (err) throw err;
        console.log('MySQL: webdb.Tracks created/verified;');
      },
    );

    con.query('USE webdb', (err, results) => {
      if (err) throw err;
      console.log(`MySQL: using webdb: ${results}`);
    });

    return con; // return handle to established connection
  },

  getUserValues: () => {
  // TODO
  },
};

