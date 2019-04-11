exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary(),
    table.string('username').notNullable();
    table.string('has_profile_pic').notNullable();
    table.string('etag');
    table.string('objectURL');
    })
  .then(()=> {
    console.log('users table created');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};