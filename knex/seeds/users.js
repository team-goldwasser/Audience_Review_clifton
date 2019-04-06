
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };

const faker = require('faker');

const createUser = () => ({
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

    if (repeat < 10) {
      for (let i = 0; i <= records; i++) {
        users.push(createUser());
        //  knex.transaction((tr) => {
      }  
        await knex.batchInsert('users', users, chunkSize)
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
