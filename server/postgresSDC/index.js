const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const {Pool} = require('pg');
var cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

const pool = new Pool({
  user: 'clifton',
  host: 'localhost',
  database: 'reviews',
  password: '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

app.get('/reviews/audience/:title', (req, res)=> {
  pool.connect((err, results) => {
    if (err) {
      console.log("error retreiving records", err)
    } 
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query(`SELECT from audience_reviews where ${req.params.title} = 9999999`, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
          res.send(results.row);
        }
      });
    });
  });
});

app.put('/reviews/audience/:title', (req, res) => {
  pool.connect((err, results) => {
    if (err) {
      console.log("error retreiving records", err)
    } 
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query(`INSERT into audience_reviews where ${req.params.title} = 9999999`, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
          res.send(results.row);
        }
      });
    });
  });
});


app.put('/attendees', Attendee.delete);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});