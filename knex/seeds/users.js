const faker = require('faker');

const createFakeUser = () => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
});

exports.seed = async function(knex, Promise) {
  //users
    const fakeUsers = [];
    const data = 100;
    for (let i = 0; i < data; i++) {
      fakeUsers.push(createFakeUser());
    }

    await 
      knex("users").del(),
      knex("users")
        .insert(fakeUsers);
    
};
