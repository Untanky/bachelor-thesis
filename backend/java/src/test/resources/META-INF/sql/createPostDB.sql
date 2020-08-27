CREATE TABLE post (
    id SEQUENCE PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(2047)
);

INSERT INTO post (id, title, description)  VALUES (1, 'First post', 'This is my first post in this blog');
INSERT INTO post (id, title, description)  VALUES (2, 'Post #2', 'My second post ever. My momma says she is so proud');
INSERT INTO post (id, title, description)  VALUES (3, 'My last post', 'I have to quit posting, so this my last post');
