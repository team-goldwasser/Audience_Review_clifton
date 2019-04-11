exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.integer('movie_id');
    table.string('movie_title').notNullable();
    table.string('title_url').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
