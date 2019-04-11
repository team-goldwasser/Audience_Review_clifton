exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('audience_reviews', (table) => {
    table.increments('id').primary(),
    table.string('review', 1000).notNullable();
    table.string('user_id').notNullable();
    table.string('movie_id').notNullable();
    table.string('stars').notNullable();
    table.string('not_interested').notNullable();
    table.string('want_to_see_it').notNullable();
    table.string('liked').notNullable();
    })]
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('audience_reviews');
};
