var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./database/helper.js');
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.options('*', cors());

app.get('/reviews/audience/:title', (req, res) => {
  db.getAudienceReview(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(results, null, 2));
    }
  });
});

app.get('/reviews/scoreboard/:title', (req, res) => {
  db.getAudienceScoreboard(req.params.title, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(JSON.stringify(results, null, 2));
    }
  });
});

let port = process.env.PORT || 9007;

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = {server};