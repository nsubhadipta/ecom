const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5500;

const helmet = require("helmet"); 
const cors = require("cors");

app.use(helmet()); 
app.use(cors());
app.options("*", cors()); 
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


// Registration route
app.post('/register', (req, res) => {
  const { email, password, username } = req.body;

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
  const { email, password } = req.body;
  console.log("hello",email);

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
      return res.json({status:1,msg:'Login successful'});
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
