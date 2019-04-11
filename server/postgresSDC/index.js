const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const db = require('../db');
const {Pool, Client} = require('pg');
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

//returns the reviews for the a movieid
app.get('/reviews/audience/:id', (req, res )=> {
    pool.connect((err, client,  done) => {
      if (err) throw err;

      client.query(`SELECT review FROM audience_reviews WHERE user_id = ${req.params.id}`, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
          //res.send(results.row);
        }
      });
    });
  });


// insert a review for a specific movie_id
app.post('/reviews/audience/:id', (req, res) => {
  pool.connect((err, results) => {
    if (err) {
      console.log("error retreiving records", err)
    } 
    pool.connect((err, client, done) => {
      if (err) throw err;

        let query = 'INSERT INTO audience_reviews (review, user_id, stars, not_interested, want_to_see_it) \
        VALUES ($1, $2, $3, $4, $5)';
        let value = [req.params.review, req.params.user_id, req.params.stars, req.params.not_interested, req.params.want_to_see_it];

        client.query( query, value, (err, res) => {
          done();
        
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
          // res.send(results.row);
        }
      });
    });
  });
});

//remove a showtime by its id
app.delete('/reviews/audience/:id', (req, res) => {
  pool.connect((err, results ) => {
    if (err) {
      console.log("error deleting record", err)
    }

    let query = `DELETE FROM audience_reviews WHERE user_id = ${req.params.id}`;

    client.query(query, (err, result) => {
      done();

      if (err) {
        console.log('Error deleting record', err.stack);
      }
        console.log(result);
        res.status(200).send(result);
    });
  });
});


app.put('/reviews/audience/:id', (req, res) => {

})


const PORT = process.env.PORT || 9004;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});