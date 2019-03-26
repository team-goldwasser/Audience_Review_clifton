
exports.up =  function(knex, Promise) {
  return Promise.all ([knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary(),
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable();
    })
  ]);
};

exports.down =  function(knex, Promise) {
   return knex.schema.dropTable('users');
};
