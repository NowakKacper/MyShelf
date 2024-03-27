CREATE TABLE users(
    id serial PRIMARY KEY,
    username VARCHAR ( 255 ) UNIQUE NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE role (
    id serial PRIMARY KEY,
    name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE user_roles (
    user_id INT Not NULL,
    role_id INT NOT NULL,
    FOREIGN  key(user_id)
    references users(id),
    FOREIGN KEY(role_id)
    references role(id)
);

CREATE TABLE book (
    id serial PRIMARY KEY,
    title VARCHAR ( 255 ) NOT NULL,
    author VARCHAR ( 255 ) NOT NULL,
    category varchar ( 255 ),
    user_id INT  NOT NULL,
    is_accepted boolean NOT NULL,
    FOREIGN  key(user_id)
    references users(id)
);

CREATE TABLE rating (
    id serial PRIMARY KEY,
    rating INT NOT NULL,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(book_id)
    references book(id),
    FOREIGN KEY(user_id)
    references users(id)
);