var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  id: String,
  review: String,
  user_id: Number,
  movie_id: Number,
  stars: {type: Number, min: 1, max: 5},
  not_interested: String,
  want_to_see_it: String,
  liked: Boolean,
});

var userSchema = new mongoose.Schema({
  // user_id: {type: String, required: true},
  // seq: {type:Number, default:0},
  username: String,
  has_profile_pic: Boolean,
  etag: Boolean,
  objectURL: String
});

var movieIDSchema = new mongoose.Schema({
  movie_id: Number,
  movie_title: String,
  title_url: String,
});

let Reviews = mongoose.model("Reviews", reviewSchema);
let Users = mongoose.model("Users", userSchema);
let Movies = mongoose.model("Movies", movieIDSchema);

module.exports = {Reviews, Users, Movies};