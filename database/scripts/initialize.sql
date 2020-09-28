CREATE DATABASE blog;
\connect blog

DROP TABLE IF EXISTS post;

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255)
);

INSERT INTO post (title, description) 
VALUES
  ('First post', 'Description'),
  ('Second post', 'Description'),
  ('Third post', 'Description');
