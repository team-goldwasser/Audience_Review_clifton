const faker = require('faker');
// const helper = require('./');
const reviews = require('../data/movieReviews.json');

var findMovieTitle = function (movies) {
  let titles = [];
    movies.forEach(movie => {
    titles.push(movie.movie_title);
    });
  return (titles[Math.floor(Math.random()*titles.length)]);
}

var findTitleURL = function (movies) {
  var movieTitles = [];
    movies.forEach(movie => {
      movieTitles.push(movie.title_url);
    });
    
  return (movieTitles[Math.floor(Math.random() * movieTitles.length)]);
};

var findMovieID = function (movies) {
  var movieID = [];
    movies.forEach(movie => {
      movieID.push(movie.movie_id);
    });
    
  return (movieID[Math.floor(Math.random() * movieID.length)]);
};

var findUserID = function (reviews) {
  var userID = [];
    reviews.forEach(review => {
      userID.push(review.user_id);
    });
    
  return (userID[Math.floor(Math.random() * userID.length)]);
};


const createUser = () => ({
 user_id: findUserID(reviews),
 username: faker.name.lastName(),
 has_profile_pic: faker.random.boolean(),
 etag: faker.name.jobTitle(),
 objectURL: faker.image.imageUrl(),
});

console.log(createUser());
module.exports = {findMovieTitle,findTitleURL, findUserID, findMovieID}