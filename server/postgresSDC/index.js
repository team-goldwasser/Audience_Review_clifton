const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('../../knex/knex');
const app = express();
var cors = require('cors');
var db = require('../database/helper');
const newRelic = require('newrelic');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.options('*', cors());


// app.get('/reviews/audience/:title', (req, res) => {
//   db.getAudienceReview(req.params.title, (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send(JSON.stringify(results, null, 2));
//     }
//   });
// });

// app.get('/reviews/scoreboard/:title', (req, res) => {
//   db.getAudienceScoreboard(req.params.title, (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send(JSON.stringify(results, null, 2));
//     }
//   });
// });

// //returns the reviews for the a movieid
app.get('/reviews/audience/:id', (req, res ) => {
  knex.from('audience_reviews').innerJoin('users', 'audience_reviews.user_id', 'users.user_id').select().limit(4)
    .then((data) => {
      console.log('data',data);
      res.status(200).send(data);
    })
    .catch((err)=> {
      console.log('err', err);
    });
  
  });
  // var getAudienceReview = function(id, callback) {
  //   connection.query(`SELECT id, users.username, review, stars FROM audience_reviews \
  //   INNER JOIN users ON users.user_id = audience_reviews.user_id 
  //   AND movie_id=${id} LIMIT 4;`, (err, results) => {
  //     if (err) {
  //       console.log("Error getting reviews", err);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // }
  

// insert a review for a specific movie_id
app.post('/reviews/audience/:id', (req, res) => {
  let review = req.body.data
  knex('audience_reviews').insert(review)
    .then((result) => {
      console.log(result);
      res.status(200).send(`${result} was added to the forum`);
    })
    .catch((err)=> {
      console.log('err', err);
    });




app.delete('/reviews/audience/:id', (req, res) => {
  knex('audience_review').where({user_id: req.params.id})
    .delete()
    .then((result) => {
      let msg = `${req.params.id} was deleted`
      res.status(200).send(msg);
    });
});


app.put('/reviews/audience/:id', (req, res) => {
  knex('audience_review').where({user_id: req.params.id} )
    .update(req.body)
    .then((result)=> {
      console.log(result);
      res.status(200).send(result);
    });
  });
});

const PORT = process.env.PORT || 9004;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});