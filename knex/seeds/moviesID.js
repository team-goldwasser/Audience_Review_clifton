
const faker = require("faker");
const movies = require('../../data/movieIDTitle.json');
const helper = require('../../server/helpers');


const createMovie = () => ({
   movie_id: helper.findMovieID(movies),
   movie_title: helper.findMovieTitle(movies),
   title_url: helper.findTitleURL(movies)
});

exports.seed =  function(knex, Promise) {
 return knex('movies').del()
  .then(async function ()  {
    let repeat = 0;
    const users = [];
    let chunkSize = 1000;
    const records = 1000000;

    while (repeat <= 4) {
      console.time();
      for (let i = 0; i <= records; i++) {
        users.push(createMovie());
        //  knex.transaction((tr) => {
      }  
        await knex.batchInsert('movies', users, chunkSize)
                // .transacting(tr);
              .then(result => {
                console.timeEnd();
                console.log(`Done loading ${records} into movies table`);
                console.log('repeat', repeat);
              })
              .catch((err) => {
                console.log("Unable to batch insert" , err);
            });
        repeat++;
    };
  });
};

