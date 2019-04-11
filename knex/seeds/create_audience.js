
const faker = require('faker');
const fs = require('fs');
const Stopwatch = require('statman-stopwatch');

// const getUserID = () => {
//   fs.readFile('data/movieIDTitle.json', 'utf-8', (err, data) => {
//     if (err) {
//       console.log("Error reading movie ID file", err);
//     } else {
//       console.log(data)
//     }
// }  

// getUserID()

const createReview = () => ({
   review :faker.lorem.words(),
   user_id : faker.random.number(),
   movie_id : faker.random.number(),
   stars: faker.random.number(),
   not_interested  :faker.random.boolean(),
   want_to_see_it : faker.random.boolean(),
   liked : faker.random.boolean()
});

exports.seed =  function(knex, Promise) {

 return knex('audience_reviews').del()
  .then(

    async function seedReviews()  {
      let repeat = 0;
      const reviews = [];
      let chunkSize = 1000;
      const records = 1000000;
  
      while (repeat <= 4) {
        var st = new Stopwatch(true);
        console.time()
        for (let i = 0; i <= records; i++) {
          reviews.push(createReview());
        }  
          await knex.batchInsert('audience_reviews', reviews, chunkSize)
                  // .transacting(tr);
                .then(result => {
                  console.timeEnd();
                  console.log(`Done loading ${records} into audience_reviews table`);
                  console.log('repeat', repeat);
                })
                .catch((err) => {
                  console.log("Unable to batch insert" , err);
              });
          repeat++;
      };
  });
};
