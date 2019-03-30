const faker = require('faker');

const createFakeUser = () => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
});

exports.seed =  function(knex, Promise) {
  //users
  return knex('users').del()
    .then(  () => {
      const fakeUsers = [];
      let chuckSize = 100;
      const data = 1000000;
      for (let i = 0; i < data; i++) {
        fakeUsers.push(createFakeUser());
      }
       knex.batchInsert("users",fakeUsers, chuckSize);
    });
    
};
