var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./database/helper.js');
var cors = require('cors');
const path = require('path');
const knex = require('../knex/knex');

var cors = require('cors');
//var db = require('../database/helper');
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


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.options('*', cors());



// //returns the reviews for the a movieid
app.get('/reviews/audience/:id', (req, res ) => {
  let id = req.params.id;
  knex.from('audience_reviews').innerJoin('users', 'audience_reviews.user_id', 'users.user_id').select().where('id',id).limit(1)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err)=> {
      console.log('err', err);
    });
  });


// insert a review for a specific movie_id
app.post('/reviews/audience/:id', (req, res) => {
  var review = req.body.data;
  knex('audience_reviews').insert(review)
    .then((result) => {
      res.status(200).send(`${result} was added to the forum`);
    })
    .catch((err)=> {
      console.log('err', err);
    });

app.delete('/reviews/audience/:id', (req, res) => {
  knex('audience_review').where({user_id: req.params.id})
    .delete()
    .then((result) => {
      let msg = `${req.params.id} was deleted`;
      res.status(200).send(msg);
    });
});

app.put('/reviews/audience/:id', (req, res) => {
  knex('audience_review').where({user_id: req.params.id} )
    .update(req.body)
    .then((result)=> {
      res.status(200).send(result);
    });
  });
})

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

let port = process.env.PORT || 9007;

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = {server};