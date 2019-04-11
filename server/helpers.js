
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
}

module.exports = {findMovieTitle,findTitleURL}