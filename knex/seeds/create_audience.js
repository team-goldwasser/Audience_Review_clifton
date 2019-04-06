
const faker = require('faker');

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
  .then(async function ()  {
    let repeat = 0;
    const reviews = [];
    let chunkSize = 1000;
    const records = 1000000;
    console.time();

    if (repeat < 10) {
      for (let i = 0; i <= records; i++) {
        reviews.push(createReview());
        //  knex.transaction((tr) => {
      }  
        await knex.batchInsert('audience_reviews', reviews, chunkSize)
                // .transacting(tr);
              .then(result => {
                console.timeEnd();
                console.log(`Done loading ${records}`);
              })
              .catch((err) => {
                console.log("Unable to batch insert" , err);
            });
        repeat++;
    };
  });
};
