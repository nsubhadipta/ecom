const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5500;

const helmet = require("helmet"); //For securing Express apps by setting various HTTP headers
const cors = require("cors");
const path = require( 'path' );
const fs = require( 'fs' );

app.use(helmet()); // Using Helmet in Middleware For securing Express apps by setting various HTTP headers
app.use(cors()); // For allowing Cross-Origin-Resource-Sharing
app.options("*", cors()); // For allowing Cross-Origin-Resource-Sharing for every type of HTTP Method
app.use(express.json());


// Connect to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_ecom'
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('MySQL connection established');
  }
});

// Set up the server-side routes

// Registration route
app.post('/register', (req, res) => {
  // Retrieve the form data from the request object
  const { email, password, username } = req.body;

  // Insert the form data into the database using a MySQL query
  connection.query(
    'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
    [email, password, username],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      return res.send({status:1,msg:'Registration successful'});
    }
  );
});

// Login route
app.post('/login', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
  // Retrieve the form data from the request object
  const { email, password } = req.body;
  console.log("hello",email);

  // Retrieve the user's record from the database using a MySQL query
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      if (results.length === 0) {
        return res.status(401).send('Email or password is incorrect');
      }
      const user = results[0];
      if (user.password !== password) {
        return res.status(401).send('Email or password is incorrect');
      }
      // Set a session cookie or store the user's information in a session object to keep them logged in
    //   req.session.user = user;
      return res.json({status:1,msg:'Login successful'});
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
