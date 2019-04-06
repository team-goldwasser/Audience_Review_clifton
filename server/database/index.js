var mysql = require('mysql');
var movieReviews = require('../../data/movieReviews.json');
var users = require('../../data/user.json');
var env = process.env.NODE_ENV || 'development';
var config = require('./config.js')[env];

var connection = mysql.createConnection(config);

connection.connect(function(err){
   if (err){
      console.log(err);
   }
   console.log("Connected...");
   
   // Insert movie reviews
   // TODO: Insert Date...currently is null
   movieReviews.forEach( (review) => {
      var sql = `INSERT INTO audience_reviews (id, review, user_id, \
         movie_id, stars, not_interested, want_to_see_it, liked) VALUES (${review.id}, \
         ${mysql.escape(review.review)}, ${review.user_id}, ${review.movie_id}, \
         ${review.stars}, ${review.not_interested}, ${review.want_to_see_it}, \
         ${review.liked})`;
      connection.query(sql, (err, res) => {
         if (err) {
            console.log("err writing", err);
         } else {
            console.log("record was inserted");
         }
      });
   });

   // Insert users
   // TODO: Insert etag, objectURL for profile pic
   users.forEach( (user) => {
      var sql = `INSERT INTO users (user_id, username, has_profile_pic \
         ) VALUES (${user.id}, \
         ${mysql.escape(user.username)}, ${user.has_profile_pic})`;
      connection.query(sql, (err, res) => {
         if (err) {
            console.log("err writing", err);
         } else {
            console.log("record was inserted");
         }
      });
   });
   
   connection.end();
});