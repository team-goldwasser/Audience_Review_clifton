DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

USE reviews;

CREATE TABLE audience_reviews (
  id INT NOT NULL,
  review VARCHAR(1000),
  user_id INT,
  movie_id INT,
  stars VARCHAR(10),
  not_interested VARCHAR(10),
  want_to_see_it VARCHAR(10),
  liked VARCHAR(10),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  user_id INT NOT NULL,
  username VARCHAR(30),
  has_profile_pic varchar(10),
  etag varchar(255),
  objectURL varchar(255),
  PRIMARY KEY(user_id)
);

CREATE TABLE movies (
  movie_id INT NOT NULL,
  movie_title VARCHAR(50),
  title_url VARCHAR(50),
  PRIMARY KEY(movie_id)
);