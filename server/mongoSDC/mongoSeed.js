var mongoose = require('mongoose');
const faker = require("faker");
const movies = require('../../data/movieIDTitle.json');
const helper = require('./helper');

mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo DB");
});

//define schema
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

//compile schema to model
let Reviews = mongoose.model("Reviews", reviewSchema);

let count = 0;
let count2 = 0;

var reviewSeed = () => {
  let data = [];
  let records = 100000;
  console.time();
  for (let i = records; i >= 0; i--) {
    let reviews = faker.lorem.sentences();
    let user_id = faker.random.number({min:1, max:10000000});
    let movie_id = faker.random.number({min:1, max:10000000});
    let not_interested = faker.random.boolean();
    let wantSee = faker.random.boolean();
    let liked = faker.random.boolean();
    
    let review = new Reviews({
      review: reviews,
      user_id: user_id,
      movie_id: movie_id,
      not_interested: not_interested,
      want_to_see_it: wantSee,
      liked: liked
    });  
    data.push(review);
  }
  return Reviews.insertMany(data)
    .then(() => {
      if (count < 100) {
        count++;
        reviewSeed();
      } else {
        console.timeEnd();
      }
    }).then(()=> {
      console.log(`inserted ${data.length} records in the review table`)
    });  
};



let Users = mongoose.model("Users", userSchema);

var userSeed = () => {
  let data = [];
  let records = 2;
  console.time();
    for (let i = records; i >= 0; i--) {
      let username = faker.internet.userName();
      let has_profile_pic = faker.random.boolean();
      let etag = faker.random.boolean();
      let objectURL = faker.image.imageUrl();
    
      let users = new Users({
        username: username,
        has_profile_pic: has_profile_pic ,
        etag: etag,
        objectURL: objectURL
      });  

      data.push(users);
    }

  return Users.insertMany(data)
    .then(() => {
      if (count2 < 2) {
        count2++;
        userSeed();
      } else {
        console.timeEnd();
      }
    }).then(() => {
      console.log(`inserted ${data.length} records in the userSeed`)
    });  
};


let Movies = mongoose.model("Movies", movieIDSchema);

var movieSeed = () => {
  let data = [];
  let records = 100000;
  console.time();

  for (let i = records; i >= 0; i--) {

   let movie_title = helper.findMovieTitle(movies);
   let title_url = helper.findTitleURL(movies);

    let movieschema = new Movies({
      movie_title: movie_title,
      title_url: title_url,
    });  

    data.push(movieschema);
  }

  return Movies.insertMany(data)
    .then(() => {
      if (count2 < 100) {
        count2++;
        movieSeed();
      } else {
        console.timeEnd();
      }
    }).then(() => {
      console.log(`inserted ${data.length} records in the MovieSeed`)
    });  
};




movieSeed();
