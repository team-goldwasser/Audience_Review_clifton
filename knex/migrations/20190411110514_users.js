exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.integer('user_id'),
    table.string('username')
    table.string('has_profile_pic')
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