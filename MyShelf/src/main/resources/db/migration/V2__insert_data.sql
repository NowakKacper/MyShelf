INSERT INTO users (email, password, username)
VALUES('kacper@email.pl','kacper1234', 'kacper');

INSERT into role(name)
VALUES ('ROLE_USER');

INSERT into role(name)
VALUES ('ROLE_ADMIN');

INSERT into user_roles(user_id, role_id)
VALUES (1,1);

INSERT INTO book (author, title, user_id, is_accepted, category)
VALUES('Janek','super ksiazka', 1, true, 'HORROR');

INSERT INTO rating(rating, book_id, user_id)
VALUES (9,1,1);