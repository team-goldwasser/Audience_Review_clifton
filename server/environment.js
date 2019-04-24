const getMovieIDURL = function() {
  let titleURL = window.location.pathname.slice(2).slice(1);
  if (titleURL.length === 0) {
    console.log('invalid url was passed in');
    return "black_panther";
  } else {
    return titleURL;
  }
}

const getEnvironment = function() {
  let service = {};
  if (process.env.NODE_ENV === 'production') {
    service = {
      scoreboard:'http://ec2-13-57-3-67.us-west-1.compute.amazonaws.com:9001',
      showtime: 'http://ec2-54-67-109-163.us-west-1.compute.amazonaws.com:9002',
      reviews:'http://ec2-34-200-239-184.compute-1.amazonaws.com:9003'
    };
  } else {
    service = {
      scoreboard: 'http://localhost:9001',
      showtime:'http://localhost:9002',
      reviews: 'http://localhost:9003'
    };
  }
  return service;
};

module.exports = {getMovieIDURL, getEnvironment};