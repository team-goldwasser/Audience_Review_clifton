var mongoose = require('mongoose');
const faker = require("faker");

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



//compile schema to model
let Reviews = mongoose.model("Reviews", reviewSchema);

var seed = () => {
  let count = 0;
  let data = [];
  let records = 2;

  for (let i = 0; i <= records; i++) {
    let reviews = faker.lorem.sentences();
    let user = faker.random.number();
    let movie = faker.random.number();
    let not_interested = faker.random.boolean();
    let wantSee = faker.random.boolean();
    let liked = faker.random.boolean();
    
    //define schema
    let review = new Reviews({
      review: reviews,
      user_id: user,
      movie_id: movie,
      not_interested: not_interested,
      want_to_see_it: wantSee,
      liked: liked
    });  
    
    data.push(review)
    console.log(data);

  Reviews.insertMany(data)
    
      console.log(`inserted ${data.length} records`)
      data = [];
      count++;
      console.log("count " + count)
   
  }
};

seed();
