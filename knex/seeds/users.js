
const faker = require('faker');
const helper = require('../../server/helpers');
const reviews = require('../../data/movieReviews.json');

const createUser = () => ({
    user_id: helper.findUserID(reviews),
   username: faker.name.lastName(),
   has_profile_pic: faker.random.boolean(),
   etag: faker.name.jobTitle(),
   objectURL: faker.image.imageUrl(),
});

exports.seed =  function(knex, Promise) {
 return knex('users').del()
  .then(async function ()  {
    let repeat = 0;
    const users = [];
    let chunkSize = 1000;
    const records = 1000000;
    console.time();

    while (repeat <= 4) {
      for (let i = 0; i <= records; i++) {
        users.push(createUser());
        //  knex.transaction((tr) => {
      }  
        await knex.batchInsert('users', users, chunkSize)
                // .transacting(tr);
              .then(result => {
                console.timeEnd();
                console.log(`Done loading ${records} into users table`);
                console.log('repeat', repeat);
              })
              .catch((err) => {
                console.log("Unable to batch insert" , err);
            });
        repeat++;
    };
  });
};

console.log(createUser());
