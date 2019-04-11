exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.integer('movie_id');
    table.string('movie_title')
    table.string('title_url')
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
