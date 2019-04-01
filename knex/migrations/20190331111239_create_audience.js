exports.up = function(knex, Promise) {
  return knex.schema.createTable('audience_reviews', (table) => {
    table.increments('id').primary(),
    table.string('review').notNullable();
    table.string('user_id').notNullable();
    table.string('movie_id').notNullable();
    table.string('stars').notNullable();
    table.string('not_interested').notNullable();
    table.string('want_to_see_it').notNullable();
    table.string('liked').notNullable();
    })
    .createTable("users", (table) => {
      table.increments('user_id').primary(),
      table.string('username'),
      table.string('has_profile_pic'),
      table.string("etag"),
      table.string("objectURL")
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('audience_reviews');
};
