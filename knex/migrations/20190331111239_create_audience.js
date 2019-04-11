exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('audience_reviews', (table) => {
    table.increments('id').primary(),
    table.string('review', 1000)
    table.integer('user_id')
    table.integer('movie_id')
    table.string('stars')
    table.string('not_interested')
    table.string('want_to_see_it')
    table.string('liked')
    })]
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('audience_reviews');
};
